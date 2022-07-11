import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  iniciarSesion:FormGroup;
  constructor(private fb:FormBuilder,
    private loginService:LoginService) {
    this.loginForm = this.fb.group({
      email:['',[]],
      pass:['',[]]
    });
   }


  ngOnInit(): void {
  }

  login(){
    let usuario:Usuario={
      email:this.loginForm.value.email,
      pass:this.loginForm.value.pass
    }
    this.loginService.login(usuario)
    
  }


}
