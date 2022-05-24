import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  url = "http://localhost:8080/api"

  

  constructor(private http:HttpClient,
    private router:Router) { 
  }

  agregarEducacion(educacion:Educacion){
    this.http.post(this.url+'/educacion', educacion, {  responseType: 'text' })
          .subscribe((resp:any)=>{
            console.log('agregado')
          })
          
  }


  public getEducaciones(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.url+'/educaciones');
  }
  
  


}
