import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faSliders } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faBars = faBars
  usuario:boolean = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  activeMenu(){
    let dropMenu = document.querySelector('.dropMenu')
    if(dropMenu){
      if(dropMenu.classList.contains('active')){
        dropMenu.classList.remove('active')
      }
      else{
        dropMenu.className+=' active'
      }
    }
  }

  getUser(){
    let isLoged = localStorage.getItem('auth_token');
    
    if(isLoged){
      this.usuario = true;
    }
  }

  cerrarSesion(){
    localStorage.removeItem('auth_token');
    this.usuario = false;
    this.router.navigate([''])
  }

}
