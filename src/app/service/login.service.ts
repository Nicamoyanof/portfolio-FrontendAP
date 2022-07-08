import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { text } from '@fortawesome/fontawesome-svg-core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  personaLogeada = new EventEmitter();

  url = "http://portfolioback-env.eba-bdveaatv.us-east-1.elasticbeanstalk.com/api"

  currentUserUserSubject: BehaviorSubject<any>;
  
  customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("auth_token")});

  constructor(private http:HttpClient,
    private router:Router) { 
      
  }

  login(usuario:Usuario){
    this.http.post(this.url+'/login', usuario, {  responseType: 'json' })
          .subscribe((resp:any)=>{
            localStorage.setItem('auth_token', resp.token);
            this.router.navigate(['admin'])
          })
          
  }

  getPersonaLogged(usuario:string){
    if(usuario!=null){
      return this.http.get(this.url+`/usuarioLog/${usuario}`, {headers : this.customHeaders})
    }
    return null;
  }


}
