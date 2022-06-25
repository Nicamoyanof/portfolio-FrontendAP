import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  tipoModal = new EventEmitter();

  constructor() {   }

  abrirModal(modal:string){
    this.tipoModal.emit(modal);
  }
  
}
