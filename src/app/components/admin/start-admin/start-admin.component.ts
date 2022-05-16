import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Persona } from 'src/app/models/personas';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-start-admin',
  templateUrl: './start-admin.component.html',
  styleUrls: ['./start-admin.component.css']
})
export class StartAdminComponent implements OnInit {

  faPen=faPen
  adminEdit:boolean=false;

  formData:FormGroup

  constructor(private router:Router,
    private fb:FormBuilder,
    private personaService:PersonasService) { 
      this.formData=this.fb.group({
        nombre:['',[]],
        apellido:['',[]],
        profesion:['',[]],
        ciudad:['',[]],
        pais:['',[]],
        descripcion:['',[]],
        imgPerfil:['',[]],
      })

    }


  ngOnInit(): void {
    console.log(this.router.url)
    this.isAdminEdit();
  }

  isAdminEdit(){

    let isLoged = localStorage.getItem('auth_token');

    if(this.router.url=='/admin' && isLoged ){
      this.adminEdit=true;
    }else{
      this.adminEdit=false;
    }
  }

  activeModal(){
    let windowsModalStart = document.querySelector<HTMLElement>('.windowsModalStart')
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

  datosPersonales(){
    let datosPersona:Persona={
      nombre:this.formData.value.nombre,
      apellido:this.formData.value.apellido,
      profesion:this.formData.value.profesion,
      ciudad:this.formData.value.ciudad,
      pais:this.formData.value.pais,
      descripcion:this.formData.value.descripcion,
      imgPerfil:this.formData.value.imgPerfil
    }
    this.personaService.agregarPersona(datosPersona)
  }


}
