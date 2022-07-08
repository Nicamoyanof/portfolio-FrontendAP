import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Proyecto, ProyectoCompleto } from 'src/app/models/proyecto';
import { PersonasService } from 'src/app/service/personas.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  github=faGithub
  listaProyectos:ProyectoCompleto[] = [];


  constructor(private personaService:PersonasService,
    private proyectoService:ProyectoService) { }

  ngOnInit(): void {
    this.personaService.getPersonaProyectos(2).subscribe((lista:any[])=>{
      lista.forEach(element => {
        this.proyectoService.getHabilidadesProyecto(element.idProyecto).subscribe((habArr:any[])=>{
          let proyectoCompleto:ProyectoCompleto;
          proyectoCompleto = {
            idProyecto:element.idProyecto,
            imgProyecto:element.imgProyecto,
            nombre:element.nombre,
            linkGithub:element.linkGithub,
            habilidades:habArr
          }

          this.listaProyectos.push(proyectoCompleto);

        })
      });

    })
  }

}
