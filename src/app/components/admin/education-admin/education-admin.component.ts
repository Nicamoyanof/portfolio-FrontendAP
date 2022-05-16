import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-education-admin',
  templateUrl: './education-admin.component.html',
  styleUrls: ['./education-admin.component.css'],
})
export class EducationAdminComponent implements OnInit {
  faPlusEdu = faPlus;
  faCheckEdu = faCheck;
  formData: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private personaService: PersonasService,
    private educacionService:EducacionService
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      titulo: ['', []],
      anioInicio: ['', []],
      anioFinal: ['', []],
      logo: ['', []],
    });
  }

  ngOnInit(): void {
  }

  activeModalEdu(){
    let windowsModalStart = document.querySelector<HTMLElement>('.windowsModalStartEdu')
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

  agregarEducacion() {
    let educacion: Educacion = {
      nombre: this.formData.value.nombre,
      titulo: this.formData.value.titulo,
      anioInicio: this.formData.value.anioInicial,
      anioFinal: this.formData.value.anioFinal,
      logo: this.formData.value.logo,
    };
    this.educacionService.agregarEducacion(educacion);
  }
}
