import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { LoginService } from 'src/app/service/login.service';
import { ModalService } from 'src/app/service/modal.service';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-start-admin',
  templateUrl: './start-admin.component.html',
  styleUrls: ['./start-admin.component.css'],
})
export class StartAdminComponent implements OnInit {
  faPen = faPen;
  faPlus = faPlus;
  adminEdit: boolean = false;

  arrPersonaProfesion: any[] = [];
  arrPersonaDescripcion: any[] = [];

  personaLoged: any;

  userLogged: any;

  constructor(
    private router: Router,
    private personaService: PersonasService,
    private modalService: ModalService,
    private loginService:LoginService
  ) {}
  ngOnInit(): void {

    this.loginService.personaLogeada.subscribe(persona=>{
      this.userLogged=persona;
      this.personaService.getPersona(persona);
      this.personaService.personaEmitter.subscribe((val) => {
        this.personaLoged = val;
        this.arrPersonaProfesion = this.personaLoged.profesion.split('/');
        this.personaLoged.imgPerfil =
        (this.personaLoged.imgPerfil == ''|| this.personaLoged.imgPerfil == null)
        ? '../../../../assets/img/no-user.png'
        : this.personaLoged.imgPerfil;
        this.personaLoged.imgBanner =
        (this.personaLoged.imgBanner == ''|| this.personaLoged.imgBanner == null)
        ? '../../../../assets/img/bg-black.jpg'
        : this.personaLoged.imgBanner;
        this.personaLoged.imgBannerM =
        ( this.personaLoged.imgBannerM == ''|| this.personaLoged.imgBannerM == null)
        ? '../../../../assets/img/bg-black.jpg'
        : this.personaLoged.imgBannerM;
      });
    })
   
  }


  activeModal() {
    this.modalService.abrirModal('start');
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

  dividirProfesion() {
    if (this.personaLoged.profesion != null) {
      this.arrPersonaProfesion = this.personaLoged.profesion.slice('/');
    }
  }
}
