import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Proyecto, ProyectoCompleto } from 'src/app/models/proyecto';
import { PersonasService } from 'src/app/service/personas.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  faArrow=faArrowUpRightFromSquare
  github=faGithub
  listaProyectos:ProyectoCompleto[] = [];


  constructor(private personaService:PersonasService,
    private proyectoService:ProyectoService) { }

  ngOnInit(): void {
    this.personaService.getPersonaProyectos(2).subscribe((lista:any[])=>{
      lista.forEach(element => {
        this.proyectoService.getHabilidadesProyecto(element.proyectosByIdProyecto.idProyecto).subscribe((habArr:any[])=>{
          let proyectoCompleto:ProyectoCompleto;
          proyectoCompleto = {
            idProyecto:element.proyectosByIdProyecto.idProyecto,
            imgProyecto:element.proyectosByIdProyecto.imgProyecto,
            nombre:element.proyectosByIdProyecto.nombre,
            linkGithub:element.proyectosByIdProyecto.linkGithub,
            url:element.proyectosByIdProyecto.url,
            habilidades:habArr
          }

          this.listaProyectos.push(proyectoCompleto);

        })
      });

    })
  }

}
