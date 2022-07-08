import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  constructor(private loginService:LoginService,
    private router:Router) { }

  async ngOnInit(): Promise<any> {

    try {
      let token = JSON.parse(JSON.stringify(jwt_decode(localStorage.getItem('auth_token'))));

      this.loginService.getPersonaLogged(token.sub).subscribe(resp=>{
        if(!resp){
          this.router.navigate(['login']);
        }else{
          this.loginService.personaLogeada.emit(resp)
        }
      })
    
    } catch (error) {

      this.router.navigate(['login']);

    }

  }

}