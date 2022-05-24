import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Proyecto } from 'src/app/models/proyecto';
import { PersonasService } from 'src/app/service/personas.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-proyecto-admin',
  templateUrl: './proyecto-admin.component.html',
  styleUrls: ['./proyecto-admin.component.css']
})
export class ProyectoAdminComponent implements OnInit {

  github=faGithub
  faPlus = faPlus;
  faCheck = faCheck;
  formData: FormGroup;
  listSkills:any[];
  arraySelectedSkill:any[]=[]



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private personaService: PersonasService,
    private proyectoService:ProyectoService,
    private habilidadesService:SkillService
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      imgProyecto: ['', []],
      linkGithub: ['', []]
    });
  }

  ngOnInit(): void {
    this.habilidadesService.getAllSkill().subscribe((res:any[])=>this.listSkills=res)
  }

  activeModalProyecto(){
    let windowsModalStart = document.querySelector<HTMLElement>('.windowsModalStartProyecto')
    let backgroundModalClose = document.querySelector<HTMLElement>('.backgroundModalClose')
    if(windowsModalStart && backgroundModalClose){
      if(windowsModalStart.classList.contains('active') ){
        windowsModalStart.classList.remove('active')
        backgroundModalClose.classList.remove('active')
      }else{
        windowsModalStart.className+=' active'
        backgroundModalClose.className+=' active'
      }
    }
  }
  agregarProyecto() {
    let proyecto:Proyecto  = {
      nombre: this.formData.value.nombre,
      imgProyecto: this.formData.value.imgProyecto,
      linkGithub: this.formData.value.linkGithub
    };
    this.proyectoService.agregarProyecto(proyecto);
  }

  selectValor(event:any){
    this.arraySelectedSkill.push( this.listSkills[event.value])
    console.log(this.arraySelectedSkill)
   
  }

}
