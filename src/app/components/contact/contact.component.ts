import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  faLinkedin = faLinkedin
  faAt = faAt
  faGithub = faGithub

  constructor() { }

  ngOnInit(): void {
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
        console.log(result.text);
        spinner?spinner.style.display = "none":null
        checkMsg?checkMsg.style.display = "flex":null
      }, (error) => {
        console.log(error.text);
        spinner?spinner.style.display = "none":null
        errorMsg?errorMsg.style.display = "flex":null
      });
  }

}
