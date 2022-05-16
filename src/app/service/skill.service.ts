import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  url = "http://localhost:8080/api"

  constructor(private http:HttpClient) { }

  agregarSkill(skill:Skill){
    this.http.post(this.url+'/habilidad', skill, {  responseType: 'text' })
          .subscribe((resp:any)=>{
            console.log('agregado')
          })
          
  }

}
