import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/service/modal.service';


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
  datosEnviar:any;




  constructor( private modalService:ModalService) {}

  ngOnInit() {
    this.modalService.tipoModal.subscribe(valor=>this.valorModal=valor)
  }

  guardarDato(e){
    this.datosEnviar=e;
    console.log(e)
  }

  mostrar(){
    console.log(this.datosEnviar)
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
        this.modalService.tipoModal.emit('')
      } else {
        windowsModalStart.className += ' active';
        backgroundModalClose.className += ' active';
      }
    }
  }

}
