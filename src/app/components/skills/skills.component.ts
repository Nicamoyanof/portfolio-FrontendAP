import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  habilidadesPorPersona:any;

  constructor(private personaService:PersonasService) { }

  ngOnInit(): void {
    this.personaService.getHabilidadesPersona(22).subscribe(listHab=>{
      this.habilidadesPorPersona=listHab;
      console.log(listHab)
    })
  }

}
