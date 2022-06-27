import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  tipoModal = new EventEmitter();

  constructor() {   }

  async abrirModal(modal:string){
    this.tipoModal.emit(modal);
  }
  
}
