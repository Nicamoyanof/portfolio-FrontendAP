import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {


  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token")});

  url = "http://portfolioback-env.eba-bdveaatv.us-east-1.elasticbeanstalk.com/api"

  constructor(private http:HttpClient) { }

  agregarSkill(skill:Skill){
    return this.http.post(this.url+'/habilidad', skill, { headers:this.customHeaders, responseType: 'text' })
  }

  getAllSkill(){
    return this.http.get(this.url+'/habilidades')
  }

}
