import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { PersonaHabilidad } from 'src/app/models/personas';
import { Skill } from 'src/app/models/skill';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { LoginService } from 'src/app/service/login.service';
import { ModalService } from 'src/app/service/modal.service';
import { PersonasService } from 'src/app/service/personas.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-skills-admin',
  templateUrl: './skills-admin.component.html',
  styleUrls: ['./skills-admin.component.css'],
})
export class SkillsAdminComponent implements OnInit {
  faTrash = faTrash
  faPlus = faPlus;
  imgUrlPerfil:string='';
  formData: FormGroup;
  linkImgLogo:string;
  listSkills:any[];
  selectedOption:number;
  formAgregarSkill:FormGroup;
  listSkillPersona:any[];
  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private personaService: PersonasService,
    private skillService: SkillService,
    private loginService:LoginService
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
    this.getHabilidades()
    this.personaService.personaHabilidad.subscribe(e=>{
      this.listSkillPersona=e;
    })

  }
  getHabilidades(){
    this.loginService.personaLogeada.subscribe(id=>{
      this.personaService.getHabilidadesPersona(id).subscribe((res:any[])=>{
        this.personaService.personaHabilidad.emit(res)
      });
    })
    
  }
  activeModal(tipoModal) {
    this.modalService.abrirModal(tipoModal);
    let windowsModalStart =
      document.querySelector<HTMLElement>('.windowModal');
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
  eliminarHabPersona(id:number){
    this.personaService.eliminarHabilidadPersona(id).subscribe(e=>{
      this.getHabilidades();
    })
  }

}
