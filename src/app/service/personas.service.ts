import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EducacionAgregar } from '../models/educacion';
import { Persona, PersonaHabilidad, PersonaProyecto } from '../models/personas';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {


  personaEmitter = new EventEmitter();

  url = "http://localhost:8080/api"

  

  constructor(private http:HttpClient,
    private router:Router) { 
  }

  agregarPersona(id:number,persona:Persona){
    return this.http.put(this.url+ `/persona/${id}` ,  persona, {  responseType: 'text' })
  }

  educacionPersona(personaEducacion:EducacionAgregar){
    this.http.post(this.url+'/persona/estudio', personaEducacion, {  responseType: 'json' })
          .subscribe((resp:any)=>{
            console.log('agregado')
          })
  }

  getPersona(id:Number){
    this.http.get(this.url+`/persona/${id}`).subscribe((persona)=>this.personaEmitter.emit(persona))
  }

  getEstudiosPersona(id:Number){
    return this.http.get(this.url+`/persona/${id}/estudios`)
  }


  //SERVICE PERSONAS HABILIDADES

  agregarHabilidadPersona(persHabi:PersonaHabilidad){
    this.http.post(this.url+'/persona/habilidad', persHabi, {  responseType: 'text' })
    .subscribe((resp:any)=>{
      console.log('agregado')
    })
  }
  getHabilidadesPersona(id:number){
    return this.http.get(this.url+`/persona/${id}/habilidades`)
  }

  //AGREGAR PROYECTO A LA PERSONA
  agregarProyecto(perPro: PersonaProyecto){
    this.http.post(this.url+'/persona/proyecto', perPro, {  responseType: 'text' })
    .subscribe((resp:any)=>{
      console.log('agregado')
    })
  } 
  
  getPersonaProyectos(id:number){
    return this.http.get(this.url+`/persona/${id}/proyectos`)
  }

}
