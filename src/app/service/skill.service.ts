import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {


  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token"), origin:"http://portfolioback-env.eba-bdveaatv.us-east-1.elasticbeanstalk.com"});


  API_URL = environment.urlBackend

  constructor(private http:HttpClient) { }

  agregarSkill(skill:Skill){
    return this.http.post( this.API_URL + '/habilidad', skill, { headers:this.customHeaders, responseType: 'text' })
  }

  getAllSkill(){
    return this.http.get( this.API_URL + '/habilidades')
  }

}
