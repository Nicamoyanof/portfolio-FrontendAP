import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Persona, PersonaEducacion } from '../models/personas';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  url = "http://localhost:8080/api"

  

  constructor(private http:HttpClient,
    private router:Router) { 
  }

  agregarPersona(persona:Persona){
    this.http.post(this.url+'/persona', persona, {  responseType: 'text' })
          .subscribe((resp:any)=>{
            console.log('agregado')
          })
          
  }

  educacionPersona(personaEducacion:PersonaEducacion){
    this.http.post(this.url+'/persona/instituto', personaEducacion, {  responseType: 'text' })
          .subscribe((resp:any)=>{
            console.log('agregado')
          })
  }

}
