import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthJWTService {

  uri = 'http://portfolioback-env.eba-bdveaatv.us-east-1.elasticbeanstalk.com/api'

  constructor(private http:HttpClient, private router:Router) { }

  isLoggedIn(){
    const token = sessionStorage.getItem('auth_token');
    const payload = atob(token.split('.')[1]);
    const parsePayload = JSON.parse(payload);

    return parsePayload.exp > Date.now()/1000;

  }

}
