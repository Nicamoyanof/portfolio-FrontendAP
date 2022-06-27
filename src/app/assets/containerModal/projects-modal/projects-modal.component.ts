import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PersonaProyecto } from 'src/app/models/personas';
import { Proyecto, ProyectoCompleto, ProyectoHabilidad } from 'src/app/models/proyecto';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { PersonasService } from 'src/app/service/personas.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-projects-modal',
  templateUrl: './projects-modal.component.html',
  styleUrls: ['./projects-modal.component.css']
})
export class ProjectsModalComponent implements OnInit {

  github = faGithub;
  faPlus = faPlus;
  faCheck = faCheck;
  formData: FormGroup;
  listSkills: any[];
  arraySelectedSkill: any[] = [];
  imgUrlProyectoSubir: string = '';
  linkImgProyecto: string;
  listProjects: any[];
  listaProyectosFinal: any[] = [];
  disabled:boolean = false;


  @Input() valorModal:string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private personaService: PersonasService,
    private proyectoService: ProyectoService,
    private habilidadesService: SkillService,
    private db: FireStorageService
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      imgProyecto: ['', []],
      linkGithub: ['', []],
    });
  }

  ngOnInit(): void {
  }

  async agregarProyecto() {
    let idProyecto;
    let proyecto: Proyecto = {
      nombre: this.formData.value.nombre,
      imgProyecto: this.linkImgProyecto,
      linkGithub: this.formData.value.linkGithub,
    };
    await this.proyectoService.agregarProyecto(proyecto);
    idProyecto = this.proyectoService.getEmmiter();
    // .subscribe((res:any)=>{
    //   idProyecto=res;
    // })

    for (let i = 0; i < this.arraySelectedSkill.length; i++) {
      let proHab: ProyectoHabilidad = {
        habilidades: this.arraySelectedSkill[i].idHabilidad,
        proyectos: Number(idProyecto != null ? idProyecto : 0),
      };
      console.log(proHab, 'ESSS ACA');
      this.proyectoService.agregarHabilidadProyecto(proHab);
    }
    this.agregarProyectoPersona(idProyecto);
  }

  selectValor(event: any) {
    this.arraySelectedSkill.push(this.listSkills[event.value]);
    console.log(this.arraySelectedSkill);
  }
  activarBoton(valor:boolean){
    let btnEnviar = document.querySelector<HTMLElement>('.btnSubmit');
    console.log(btnEnviar)
      if(valor){
        this.disabled=true;
        btnEnviar.classList.remove('disabled');
        console.log('activado')
      }else{
        this.disabled=true;
        btnEnviar.className += ' disabled';
        console.log('desactivado 2')
      }
  }

  mostrarImagenProyecto(event: any, destino: string) {
    let spinnerImg='../../../../assets/img/spinner.gif';
    this.activarBoton(false);
    const file = (event.target as HTMLInputElement).files[0];
    this.imgUrlProyectoSubir = spinnerImg;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      console.log('antes');
      await this.db
      .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
      .then((urlImg: string) => {
          this.imgUrlProyectoSubir = reader.result as string;
          this.linkImgProyecto = urlImg;
          console.log('subido');
          this.activarBoton(true);
        });
    };
  }

  agregarProyectoPersona(id: number) {
    let proPersona: PersonaProyecto = {
      persona: 2,
      proyecto: id,
    };

    this.personaService.agregarProyecto(proPersona);
  }

}
