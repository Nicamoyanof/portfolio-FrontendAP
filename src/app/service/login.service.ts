import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { text } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:8080/api"

  currentUserUserSubject: BehaviorSubject<any>;
  

  constructor(private http:HttpClient,
    private router:Router) { 
      this.currentUserUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('authController'))||{})
  }

  login(usuario:Usuario){
    this.http.post(this.url+'/login', usuario, {  responseType: 'text' })
          .subscribe((resp:any)=>{
            this.router.navigate( ['admin'])
            console.log('bien')
            localStorage.setItem('auth_token', resp)
          })
          
  }
  iniciarSesion(credencial:any):Observable<any>{

    return this.http.post(this.url+'/iniciar-sesion', credencial).pipe(map((data)=>{
      sessionStorage.setItem('authController', JSON.stringify(data));
      return data;
    }))

  }


}
