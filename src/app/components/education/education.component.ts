import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  listEstudios:any;

  constructor(private personasService:PersonasService) { }

  ngOnInit(): void {

    this.personasService.getEstudiosPersona(2)
    this.personasService.estudiosPersonaEmitter.subscribe(lista=>{
      this.listEstudios=lista;
    })

  }

}
