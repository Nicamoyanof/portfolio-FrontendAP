import { Component, OnInit } from '@angular/core';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faFile=faFile
  homeCargado:boolean;

  constructor(private personaService:PersonasService) { }

  ngOnInit(): void {
    // this.personaService.getPersona(2);
    this.personaService.homeCargado.subscribe(bool=>{
      this.homeCargado = bool
      document.querySelector<HTMLElement>('.containerHome').className+=' loaded';
    })

  }

}
