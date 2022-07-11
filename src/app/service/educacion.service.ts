import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  educacionesEmitter = new EventEmitter();

  API_URL = environment.urlBackend


  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token")});
  

  constructor(private http:HttpClient,
    private router:Router) { 
  }

  agregarEducacion(educacion:Educacion){
    return this.http.post((this.API_URL)+'/educacion', educacion, { headers:this.customHeaders ,  responseType: 'text' })
  }


  public getEducaciones() {
    this.http.get<Educacion[]>((this.API_URL)+'/educaciones').subscribe(valor=>this.educacionesEmitter.emit(valor))
  }
  
  


}
