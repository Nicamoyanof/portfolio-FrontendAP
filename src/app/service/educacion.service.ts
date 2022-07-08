import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  educacionesEmitter = new EventEmitter();

  url = "http://portfolioback-env.eba-bdveaatv.us-east-1.elasticbeanstalk.com/api"

  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token")});
  

  constructor(private http:HttpClient,
    private router:Router) { 
  }

  agregarEducacion(educacion:Educacion){
    return this.http.post(this.url+'/educacion', educacion, { headers:this.customHeaders ,  responseType: 'text' })
  }


  public getEducaciones() {
    this.http.get<Educacion[]>(this.url+'/educaciones').subscribe(valor=>this.educacionesEmitter.emit(valor))
  }
  
  


}
