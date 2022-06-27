import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PersonaHabilidad } from 'src/app/models/personas';
import { Skill } from 'src/app/models/skill';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ModalService } from 'src/app/service/modal.service';
import { PersonasService } from 'src/app/service/personas.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.css']
})
export class SkillModalComponent implements OnInit {

  faPlus = faPlus;
  imgUrlPerfil:string='';
  formData: FormGroup;
  linkImgLogo:string;
  listSkills:any[];
  selectedOption:number;
  formAgregarSkill:FormGroup;
  listSkillPersona:any[];
  disabled:boolean = false;
  @Input() valorModal:string;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonasService,
    private skillService: SkillService,
    private db:FireStorageService,
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      logo: ['', []],
      porcentaje: ['', []],
    });

    this.formAgregarSkill = fb.group({
      persona:'',
      habilidad:'',
      porcentaje:''
    })
  }

  ngOnInit(): void {
    this.skillService.getAllSkill().subscribe((res:any[])=>this.listSkills=res)
    this.personaService.getHabilidadesPersona(2).subscribe((res:any[])=>{this.listSkillPersona=res; console.log(res)});

  }
  activeModalSkill() {
    let windowsModalStart = document.querySelector<HTMLElement>(
      '.windowsModalStartSkill'
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

  agregarSkill() {
    let skill: Skill = {
      nombre: this.formData.value.nombre,
      logo: this.linkImgLogo,
    };
    this.skillService.agregarSkill(skill);
  }

  agregarSkillPersona(){
    let agregarHabilidadPersona:PersonaHabilidad={
      persona:2,
      habilidad:Number(this.selectedOption),
      porcentaje:Number(this.formAgregarSkill.value.porcentaje)
    }
      
    this.personaService.agregarHabilidadPersona(agregarHabilidadPersona);
  }

  activeModalCreaSkill() {
    let windowsModalStart = document.querySelector<HTMLElement>(
      '.windowsModalStartCrearSkill'
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
  mostrarImagen(event: any, destino: string) {
    let spinnerImg='../../../../assets/img/spinner.gif';
    this.activarBoton(false)
    this.imgUrlPerfil = spinnerImg;
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      console.log('antes');
      await this.db
      .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
      .then((urlImg: string) => {
        this.imgUrlPerfil = reader.result as string;
        this.linkImgLogo = urlImg;
        this.activarBoton(true)
        });
    };
  }

  selectValor(event: any) {
    this.selectedOption = event.value;
  }

}
