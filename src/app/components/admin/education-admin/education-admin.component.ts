import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faCheck,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { Educacion, EducacionAgregar } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ModalService } from 'src/app/service/modal.service';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-education-admin',
  templateUrl: './education-admin.component.html',
  styleUrls: ['./education-admin.component.css'],
})
export class EducationAdminComponent implements OnInit {
  faPlusEdu = faPlus;
  faCheckEdu = faCheck;
  faPen = faPen;
  faTrash = faTrash;
  imgUrlLogo: string = '';
  linkImgLogo: string;
  listaEdu: any;
  selectedOption: any;
  listaEstudiosPersonas: any[];
  userLogged: any = jwtDecode(localStorage.getItem('auth_token'));

  constructor(
    private modalService: ModalService,
    private personaService: PersonasService,
    private educacionService: EducacionService
  ) {}

  ngOnInit() {
    this.personaService.getEstudiosPersona(this.userLogged.user);
    this.personaService.estudiosPersonaEmitter.subscribe((valor) => {
      this.listaEstudiosPersonas = valor;
    });
  }

  async activeModal(tipoModal) {
    this.modalService.tipoModal.emit(tipoModal);
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

  selectValor(event: any) {
    this.selectedOption = event.value;
  }

  eliminarEstudioPersona(id: number) {
    this.personaService.eliminarEstudioPersona(id).subscribe(e=>{
      this.personaService.getEstudiosPersona(this.userLogged.user);
    })
  }
}
