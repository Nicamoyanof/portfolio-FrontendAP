import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Persona } from 'src/app/models/personas';
import { PersonasService } from 'src/app/service/personas.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  faLinkedin = faLinkedin
  faAt = faAt
  faGithub = faGithub
  persona:Persona;
  ln:string;
  gh:string;


  constructor(private personasService:PersonasService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.getPersona();
  }

  getPersona(){
    this.personasService.getPersonaFinal(2).subscribe((persona:Persona)=>{
      this.persona = persona;
    })
  }

  public sendEmail(e: Event) {
    let spinner = document.querySelector<HTMLElement>('.containerSpiner')
    let checkMsg = document.querySelector<HTMLElement>('.containerMsgSend')
    let errorMsg = document.querySelector<HTMLElement>('.containerMsgError')
    e.preventDefault();

    spinner?spinner.style.display = "flex": null;
    checkMsg?checkMsg.style.display = "none":null;
    errorMsg?errorMsg.style.display = "none":null

    emailjs.sendForm('service_jd1x3qu', 'template_cb45zim', e.target as HTMLFormElement, 'ZURdf0lRO4v_QFvHE')
      .then((result: EmailJSResponseStatus) => {
        spinner?spinner.style.display = "none":null
        checkMsg?checkMsg.style.display = "flex":null
      }, (error) => {
        spinner?spinner.style.display = "none":null
        errorMsg?errorMsg.style.display = "flex":null
      });
  }

}
