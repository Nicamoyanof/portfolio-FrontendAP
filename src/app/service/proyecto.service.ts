import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url = "http://localhost:8080/api"

  constructor(private http:HttpClient) { }

  agregarProyecto(proyecto:Proyecto){
    this.http.post(this.url+'/proyecto', proyecto, {  responseType: 'text' })
          .subscribe((resp:any)=>{
            console.log('agregado')
          })
          
  }

}
