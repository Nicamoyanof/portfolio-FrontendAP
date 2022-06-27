import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
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
  imgUrlLogo: string = '';
  linkImgLogo: string;
  listaEdu: any;
  selectedOption: any;
  listaEstudiosPersonas: any[];

  constructor(
    private modalService:ModalService,
    private personaService: PersonasService,
    private educacionService: EducacionService
  ) {  }

  async ngOnInit() {
    this.educacionService
      .getEducaciones()
      .subscribe((resp) => (this.listaEdu = resp));

    this.personaService
      .getEstudiosPersona(2)
      .subscribe((res: any[]) => console.log( res));
    this.personaService
      .getEstudiosPersona(2)
      .subscribe((res: any[]) => (this.listaEstudiosPersonas = res));
  }

  async activeModal(tipoModal) {
    this.modalService.tipoModal.emit(tipoModal);
    let windowsModalStart =
      document.querySelector<HTMLElement>('.windowModal');
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
}
