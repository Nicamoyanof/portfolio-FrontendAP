import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Skill } from 'src/app/models/skill';
import { PersonasService } from 'src/app/service/personas.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-skills-admin',
  templateUrl: './skills-admin.component.html',
  styleUrls: ['./skills-admin.component.css']
})
export class SkillsAdminComponent implements OnInit {

  faPlus=faPlus

  formData: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private personaService: PersonasService,
    private skillService:SkillService
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      logo: ['', []],
      porcentaje: ['', []]
    });
  }

  ngOnInit(): void {
  }
  activeModalSkill(){
    let windowsModalStart = document.querySelector<HTMLElement>('.windowsModalStartSkill')
    let backgroundModalClose = document.querySelector<HTMLElement>('.backgroundModalClose')
    if(windowsModalStart && backgroundModalClose){
      if(windowsModalStart.classList.contains('active')){
        windowsModalStart.classList.remove('active')
        backgroundModalClose.classList.remove('active')
      }else{
        windowsModalStart.className+=' active'
        backgroundModalClose.className+=' active'
      }
    }
  }

  agregarSkill() {
    let skill:Skill  = {
      nombre: this.formData.value.nombre,
      logo: this.formData.value.logo,
      porcentaje: Number(this.formData.value.porcentaje)
    };
    this.skillService.agregarSkill(skill);
  }

}
