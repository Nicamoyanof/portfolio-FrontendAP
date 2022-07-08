import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EducacionAgregar } from '../models/educacion';
import { Persona, PersonaHabilidad, PersonaProyecto } from '../models/personas';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {


  estudioSeleccionado = new EventEmitter();
  estudioEditar = new EventEmitter();
  estudiosPersonaEmitter = new EventEmitter();
  personaEmitter = new EventEmitter();
  personaHabilidad = new EventEmitter();

  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token"),'Access-Control-Allow-Origin': '*'});

  


  url = "http://www.portfolioback-env.eba-bdveaatv.us-east-1.elasticbeanstalk.com/api"

  

  constructor(private http:HttpClient,
    private router:Router) { 
  }

  agregarPersona(id:number,persona:Persona){
    return this.http.put(`/api/persona/${id}` ,  persona, { headers:this.customHeaders  ,  responseType: 'json'})
  }

  educacionPersona(personaEducacion:EducacionAgregar){
    return this.http.post('/api/persona/estudio', personaEducacion, { headers:this.customHeaders, responseType: 'json' })
  }

  getPersona(id:Number){
    this.http.get(`/api/persona/${id}`).subscribe((persona)=>{
      console.log('si llego hasta ca')
      this.personaEmitter.emit(persona)})
  }

  getPersonaFinal(id:Number){
    return this.http.get(`/api/persona/${id}`)
  }

  getEstudiosPersona(id:Number){
    this.http.get(`/api/persona/${id}/estudios`).subscribe(valor=>{
      this.estudiosPersonaEmitter.emit(valor);
    })
  }
  eliminarEstudioPersona(id:number){
    return this.http.delete(`/api/persona/estudio/${id}`, {headers: this.customHeaders})    
  }
  getEstudioPersona(id:number){
      this.http.get(`/api/persona/estudio/${id}`).subscribe(res=>{
        this.estudioEditar.emit(res)
      })
  }


  //SERVICE PERSONAS HABILIDADES

  agregarHabilidadPersona(persHabi:PersonaHabilidad){
    return this.http.post('/api/persona/habilidad', persHabi, { headers:this.customHeaders, responseType: 'text' })
  }
  getHabilidadesPersona(id:number){
    return this.http.get(`/api/persona/${id}/habilidades`)
  }
  eliminarHabilidadPersona(id:number){
    return this.http.delete(`/api/persona/habilidad/${id}`);
  }

  //AGREGAR PROYECTO A LA PERSONA
  agregarProyecto(perPro: PersonaProyecto){
    return this.http.post('/api/persona/proyecto', perPro, { headers:this.customHeaders, responseType: 'text' })
  } 
  
  getPersonaProyectos(id:number){
    return this.http.get(`/api/persona/${id}/proyectos`)
  }
  eliminarProyectoPersona(id:number){
    return this.http.delete(`/api/persona/proyecto/${id}`,{ headers:this.customHeaders, responseType: 'text' })
  }

}
