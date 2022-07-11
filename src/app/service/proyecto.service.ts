import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Proyecto, ProyectoHabilidad } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  valorIdProyecto:EventEmitter<any> = new EventEmitter();
  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token")});


  API_URL = environment.urlBackend

  constructor(private http:HttpClient) { }

  agregarProyecto(proyecto:Proyecto){
    return this.http.post( this.API_URL + '/proyecto', proyecto, { headers:this.customHeaders, responseType: 'text' })          
  }
  eliminarProyecto(id:number){
    return  this.http.delete( this.API_URL + `/proyecto/${id}` , { headers:this.customHeaders, responseType: 'text' })          
  }

  getEmmiter(){
    return this.valorIdProyecto;
  }

  
  agregarHabilidadProyecto(proHab:ProyectoHabilidad){
    this.http.post( this.API_URL + '/proyecto/habilidad', proHab, { headers:this.customHeaders, responseType: 'text' })
          .subscribe((resp:any)=>{return resp})
  }
 
  getHabilidadesProyecto(idProyecto:number){
    return this.http.get (this.API_URL +`/proyecto/${idProyecto}/habilidades`)
  }

  eliminarProyectoHabilidades(id:number){
    return this.http.delete (this.API_URL +`/proyecto/${id}/habilidades`,{headers:this.customHeaders})
  }

}
