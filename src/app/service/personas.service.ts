import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
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
  homeCargado =  new EventEmitter();

  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token"),'Access-Control-Allow-Origin': '*'});

  


  API_URL = environment.urlBackend

  

  constructor(private http:HttpClient,
    private router:Router) { 
      this.homeCargado.emit(false)
  }

  agregarPersona(id:number,persona:Persona){
    return this.http.put(`${this.API_URL}/persona/${id}` ,  persona, { headers:this.customHeaders  ,  responseType: 'json'})
  }

  educacionPersona(personaEducacion:EducacionAgregar){
    return this.http.post(`${this.API_URL}/persona/estudio`, personaEducacion, { headers:this.customHeaders, responseType: 'json' })
  }

  getPersona(id:Number){
    this.http.get(this.API_URL + `/persona/${id}`).subscribe((persona)=>{
      this.personaEmitter.emit(persona)})
    }
    
    getPersonaFinal(id:Number){
    return this.http.get(`${this.API_URL}/persona/${id}`)
  }

  getEstudiosPersona(id:Number){
    this.http.get(`${this.API_URL}/persona/${id}/estudios`).subscribe(valor=>{
      this.estudiosPersonaEmitter.emit(valor);
    })
  }
  eliminarEstudioPersona(id:number){
    return this.http.delete(`${this.API_URL}/persona/estudio/${id}`, {headers: this.customHeaders})    
  }
  getEstudioPersona(id:number){
      this.http.get(`${this.API_URL}/persona/estudio/${id}`).subscribe(res=>{
        this.estudioEditar.emit(res)
      })
  }


  //SERVICE PERSONAS HABILIDADES

  agregarHabilidadPersona(persHabi:PersonaHabilidad){
    return this.http.post(`${this.API_URL}/persona/habilidad`, persHabi, { headers:this.customHeaders, responseType: 'text' })
  }
  getHabilidadesPersona(id:number){
    return this.http.get(`${this.API_URL}/persona/${id}/habilidades`)
  }
  eliminarHabilidadPersona(id:number){
    return this.http.delete(`${this.API_URL}/persona/habilidad/${id}`,{ headers:this.customHeaders });
  }

  //AGREGAR PROYECTO A LA PERSONA
  agregarProyecto(perPro: PersonaProyecto){
    return this.http.post(`${this.API_URL}/persona/proyecto`, perPro, { headers:this.customHeaders, responseType: 'text' })
  } 
  
  getPersonaProyectos(id:number){
    return this.http.get(`${this.API_URL}/persona/${id}/proyectos`)
  }
  eliminarProyectoPersona(id:number){
    return this.http.delete(`${this.API_URL}/persona/proyecto/${id}`,{ headers:this.customHeaders, responseType: 'text' })
  }

}
