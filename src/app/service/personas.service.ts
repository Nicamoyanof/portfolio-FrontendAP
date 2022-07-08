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

  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token")});


  url = "http://portfolioback-env.eba-bdveaatv.us-east-1.elasticbeanstalk.com/api"

  

  constructor(private http:HttpClient,
    private router:Router) { 
  }

  agregarPersona(id:number,persona:Persona){
    return this.http.put(this.url+ `/persona/${id}` ,  persona, { headers:this.customHeaders, responseType: 'text' })
  }

  educacionPersona(personaEducacion:EducacionAgregar){
    return this.http.post(this.url+'/persona/estudio', personaEducacion, { headers:this.customHeaders, responseType: 'json' })
  }

  getPersona(id:Number){
    this.http.get(this.url+`/persona/${id}`).subscribe((persona)=>{
      console.log('si llego hasta ca')
      this.personaEmitter.emit(persona)})
  }

  getPersonaFinal(id:Number){
    return this.http.get(this.url+`/persona/${id}`)
  }

  getEstudiosPersona(id:Number){
    this.http.get(this.url+`/persona/${id}/estudios`).subscribe(valor=>{
      this.estudiosPersonaEmitter.emit(valor);
    })
  }
  eliminarEstudioPersona(id:number){
    return this.http.delete(this.url+`/persona/estudio/${id}`, {headers: this.customHeaders})    
  }
  getEstudioPersona(id:number){
      this.http.get(this.url+`/persona/estudio/${id}`).subscribe(res=>{
        this.estudioEditar.emit(res)
      })
  }


  //SERVICE PERSONAS HABILIDADES

  agregarHabilidadPersona(persHabi:PersonaHabilidad){
    return this.http.post(this.url+'/persona/habilidad', persHabi, { headers:this.customHeaders, responseType: 'text' })
  }
  getHabilidadesPersona(id:number){
    return this.http.get(this.url+`/persona/${id}/habilidades`)
  }
  eliminarHabilidadPersona(id:number){
    return this.http.delete(this.url+`/persona/habilidad/${id}`);
  }

  //AGREGAR PROYECTO A LA PERSONA
  agregarProyecto(perPro: PersonaProyecto){
    return this.http.post(this.url+'/persona/proyecto', perPro, { headers:this.customHeaders, responseType: 'text' })
  } 
  
  getPersonaProyectos(id:number){
    return this.http.get(this.url+`/persona/${id}/proyectos`)
  }
  eliminarProyectoPersona(id:number){
    return this.http.delete(this.url+`/persona/proyecto/${id}`,{ headers:this.customHeaders, responseType: 'text' })
  }

}
