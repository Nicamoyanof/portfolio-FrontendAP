import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { PersonaProyecto } from 'src/app/models/personas';
import {
  Proyecto,
  ProyectoCompleto,
  ProyectoHabilidad,
} from 'src/app/models/proyecto';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { LoginService } from 'src/app/service/login.service';
import { ModalService } from 'src/app/service/modal.service';
import { PersonasService } from 'src/app/service/personas.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-proyecto-admin',
  templateUrl: './proyecto-admin.component.html',
  styleUrls: ['./proyecto-admin.component.css'],
})
export class ProyectoAdminComponent implements OnInit {
  github = faGithub;
  faTrash = faTrash;
  faPlus = faPlus;
  faCheck = faCheck;
  formData: FormGroup;
  listSkills: any[];
  arraySelectedSkill: any[] = [];
  imgUrlProyectoSubir: string = '';
  linkImgProyecto: string;
  listProjects: any[];
  listaProyectosFinal: any[] = [];
  userEliminar:any;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private personaService: PersonasService,
    private proyectoService: ProyectoService,
    private loginService: LoginService
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      imgProyecto: ['', []],
      linkGithub: ['', []],
    });
  }

  ngOnInit(): void {
    this.loginService.personaLogeada.subscribe((id) => {
      this.userEliminar=id;
      this.personaService.getPersonaProyectos(id).subscribe((res: any) => {
        console.log('se ejecuto ')
        this.getPersonasProyectos(res);
      });
    });
  }

  getPersonasProyectos(res: any) {
    this.listProjects = res;
    console.log(res);
    for (let i = 0; i < res.length; i++) {
      let proyecto: ProyectoCompleto = {
        idProyecto: res[i].idProyecto,
        nombre: res[i].nombre,
        imgProyecto: res[i].imgProyecto,
        linkGithub: res[i].linkGithub,
        habilidades: [],
      };

      this.proyectoService
        .getHabilidadesProyecto(res[i].idProyecto)
        .subscribe((e: any[]) => {
          proyecto.habilidades = e;
        });
      this.listaProyectosFinal.push(proyecto);
    }
    console.log(this.listaProyectosFinal, 'ebusef');
  }

  activeModal(tipoModal) {
    this.modalService.abrirModal(tipoModal);
    let windowsModalStart = document.querySelector<HTMLElement>('.windowModal');
    let backgroundModalClose = document.querySelector<HTMLElement>(
      '.backgroundModalClose'
    );
    if (windowsModalStart && backgroundModalClose) {
      if (windowsModalStart.classList.contains('active')) {
        windowsModalStart.classList.remove('active');
        backgroundModalClose.classList.remove('active');
      } else {
        windowsModalStart.className += ' active';
        backgroundModalClose.className += ' active';
      }
    }
  }
  eliminarProyecto(id: number) {
    this.proyectoService.eliminarProyectoHabilidades(id).subscribe((e) => {
      this.personaService.eliminarProyectoPersona(id).subscribe((res) => {
        this.proyectoService.eliminarProyecto(id).subscribe((eliminar) => {
          this.personaService
            .getPersonaProyectos(this.userEliminar)
            .subscribe((perPro) => {
              this.personaService
                .getPersonaProyectos(this.userEliminar)
                .subscribe((res: any) => {
                  this.getPersonasProyectos(res);
                });
            });
        });
      });
    });
  }
}
