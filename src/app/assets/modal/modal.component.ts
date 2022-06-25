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
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  valorModal:string;
  faPlusEdu = faPlus;
  faCheckEdu = faCheck;
  formData: FormGroup;
  formDataAgregar: FormGroup;
  imgUrlLogo: string = '';
  linkImgLogo: string;
  listaEdu: any;
  selectedOption: any;
  listaEstudiosPersonas: any[];

  constructor( private modalService:ModalService) {}

  ngOnInit() {
    this.modalService.tipoModal.subscribe(valor=>{this.valorModal=valor})
  }

  activeModal() {
    console.log(this.valorModal)
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

}
