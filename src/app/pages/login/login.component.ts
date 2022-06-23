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
    this.loginForm = fb.group({
      email:['',[]],
      pass:['',[]]
    });

    this.loginForm = fb.group({
      email:['',[]],
      pass:['',[]], 
      deviceINf:fb.group({
        deviceId:["178678868768"],
        deviceType:["DEVICE_TYPE_ANDROID"],
        notificationToken:["67657575eececc34"]
      })
    })
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
