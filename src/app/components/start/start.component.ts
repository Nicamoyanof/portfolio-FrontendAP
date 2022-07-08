import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Persona } from 'src/app/models/personas';
import { PersonasService } from 'src/app/service/personas.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  faPen=faPen;
  persona:Persona;
  profesion:string[] = [];
  descripcion:any;
  
  adminEdit:boolean=false;

  constructor(private router:Router, private personasService:PersonasService) { }

  ngOnInit(): void {
    console.log(this.router.url)
    this.isAdminEdit();
    this.getPersona();
  }

  getPersona(){
    this.personasService.getPersonaFinal(22).subscribe((persona:Persona)=>{
      this.persona = persona;
      persona.profesion.split('/').forEach(arr=>{
        this.profesion.push(arr);
      })
      this.descripcion = persona.descripcion;
    })
  }

  isAdminEdit(){

    let isLoged = localStorage.getItem('auth_token');

    if(this.router.url=='/admin' && isLoged ){
      this.adminEdit=true;
    }else{
      this.adminEdit=false;
    }
  }

    
}
