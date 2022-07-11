import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { text } from '@fortawesome/fontawesome-svg-core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  personaLogeada = new EventEmitter();

  API_URL = environment.urlBackend

  currentUserUserSubject: BehaviorSubject<any>;
  
  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token"), 'Access-Control-Allow-Origin': '*'});

  constructor(private http:HttpClient,
    private router:Router) { 
      
  }

  login(usuario:Usuario){
    this.http.post(this.API_URL + `/login`, usuario, {  responseType: 'json' } )
          .subscribe((resp:any)=>{
            localStorage.setItem('auth_token', resp.token);
            this.router.navigate(['admin'])
          })
          
  }

  getPersonaLogged(usuario:string){
    if(usuario!=null){
      return this.http.get(this.API_URL + `/usuarioLog/${usuario}`, {headers : this.customHeaders})
    }
    return null;
  }

  usuarioAcceso(){
    return this.http.get(this.API_URL + `/access`, {headers : this.customHeaders})
  }


}
