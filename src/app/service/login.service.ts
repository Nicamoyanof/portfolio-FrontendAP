import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:8080/api"

  

  constructor(private http:HttpClient,
    private router:Router) { 
  }

  login(usuario:Usuario){
    this.http.post(this.url+'/login', usuario, {  responseType: 'text' })
          .subscribe((resp:any)=>{
            this.router.navigate( ['admin'])
            console.log('bien')
            localStorage.setItem('auth_token', resp)
          })
          
  }
}
