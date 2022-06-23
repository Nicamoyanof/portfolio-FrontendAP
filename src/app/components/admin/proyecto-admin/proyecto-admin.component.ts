import { Component, OnInit } from '@angular/core';
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
  selector: 'app-proyecto-admin',
  templateUrl: './proyecto-admin.component.html',
  styleUrls: ['./proyecto-admin.component.css'],
})
export class ProyectoAdminComponent implements OnInit {
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
    this.habilidadesService
      .getAllSkill()
      .subscribe((res: any[]) => (this.listSkills = res));

    this.personaService.getPersonaProyectos(2).subscribe((res: any) => {
      this.listProjects = res;
      for (let i = 0; i < res.length; i++) {

        let proyecto:ProyectoCompleto ={
          nombre:res[i].nombre,
          imgProyecto:res[i].imgProyecto,
          linkGithub:res[i].linkGithub,
          habilidades:[]
        } 

        this.proyectoService
          .getHabilidadesProyecto(res[i].idProyecto)
          .subscribe((res:any[]) => proyecto.habilidades=res);

        this.listaProyectosFinal.push(proyecto);
      }
    });
  }

  activeModalProyecto() {
    let windowsModalStart = document.querySelector<HTMLElement>(
      '.windowsModalStartProyecto'
    );
    let backgroundModalClose = document.querySelector<HTMLElement>(
      '.backgroundModalClose'
    );
    if (windowsModalStart && backgroundModalClose) {
      if (windowsModalStart.classList.contains('active')) {
        windowsModalStart.classList.remove('active');
        backgroundModalClose.classList.remove('active');
      } else {
        windowsModalStart.className += ' active';
        backgroundModalClose.className += ' active';
      }
    }
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

  mostrarImagenProyecto(event: any, destino: string) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      this.imgUrlProyectoSubir = reader.result as string;
      console.log('antes');
      await this.db
        .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
        .then((urlImg: string) => {
          this.linkImgProyecto = urlImg;
          console.log('subido');
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
