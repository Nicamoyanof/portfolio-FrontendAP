import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Proyecto, ProyectoHabilidad } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  valorIdProyecto:EventEmitter<any> = new EventEmitter();

  url = "http://localhost:8080/api"

  constructor(private http:HttpClient) { }

  agregarProyecto(proyecto:Proyecto):any{
    this.http.post(this.url+'/proyecto', proyecto, {  responseType: 'text' })
          .subscribe((resp:any)=>{this.valorIdProyecto = resp})
          
  }

  getEmmiter(){
    return this.valorIdProyecto;
  }

  
  agregarHabilidadProyecto(proHab:ProyectoHabilidad){
    this.http.post(this.url+'/proyecto/habilidad', proHab, {  responseType: 'text' })
          .subscribe((resp:any)=>{return resp})
  }
 
  getHabilidadesProyecto(idProyecto:number){
    return this.http.get(this.url+`/proyecto/${idProyecto}/habilidades`)
  }

}
