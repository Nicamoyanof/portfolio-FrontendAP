import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Persona } from 'src/app/models/personas';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { LoginService } from 'src/app/service/login.service';
import { ModalService } from 'src/app/service/modal.service';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-start-modal',
  templateUrl: './start-modal.component.html',
  styleUrls: ['./start-modal.component.css'],
})
export class StartModalComponent implements OnInit {
  faPlus = faPlus;
  linkImgPerfil: string;
  linkImgDesktop: string;
  linkImgMobile: string;
  linkImgLogo: string;
  imgUrlPerfil: string = '';
  imgUrlBannerD: string = '';
  imgUrlBannerM: string = '';
  imgUrlLogo: string = '';
  disabled: boolean = false;
  nombre: string;
  mensajeFinalizado: string = '';
  idPersonaLog: number;

  datosPersona: Persona = {
    usuariosByIdUsuario: null,
    nombre: '',
    apellido: '',
    profesion: '',
    ciudad: '',
    pais: '',
    descripcion: '',
    imgPerfil: '',
    imgBanner: '',
    imgBannerM: '',
    logo: '',
    email: '',
    linkedin: '',
    github: '',
  };

  @Output() datosPersonaEmit = new EventEmitter<any>();

  @Input() valorModal: string;

  @Input() personaLog:any;

  arrPersonaProfesion: any[] = [];
  arrPersonaDescripcion: any[] = [];

  personaLoged: any;

  formData: FormGroup;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private personaService: PersonasService,
    private db: FireStorageService,
    private loginService: LoginService
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      apellido: ['', []],
      profesion: ['', []],
      ciudad: ['', []],
      pais: ['', []],
      descripcion: ['', []],
      email: ['', []],
      linkedin: ['', []],
      github: ['', []],
    });

    Window['myComponente'] = this;
  }
  ngOnInit(): any {

      this.personaService.getPersona(this.personaLog);
      this.idPersonaLog = this.personaLog;
      this.personaService.personaEmitter.subscribe((valor: Persona) => {
        this.datosPersona = valor;
        this.formData.controls['nombre'].setValue(valor.nombre);
        this.formData.controls['apellido'].setValue(valor.apellido);
        this.formData.controls['profesion'].setValue(valor.profesion);
        this.formData.controls['ciudad'].setValue(valor.ciudad);
        this.formData.controls['pais'].setValue(valor.pais);
        this.formData.controls['descripcion'].setValue(valor.descripcion);
        this.formData.controls['email'].setValue(valor.email);
        this.formData.controls['linkedin'].setValue(valor.linkedin);
        this.formData.controls['github'].setValue(valor.github);
        this.imgUrlPerfil = !valor.imgPerfil.includes('../../../../assets/img')
          ? valor.imgPerfil
          : '';
        this.imgUrlBannerD = !valor.imgBanner.includes('../../../../assets/img')
          ? valor.imgBanner
          : '';
        this.imgUrlBannerM = !valor.imgBannerM.includes(
          '../../../../assets/img'
        )
          ? valor.imgBannerM
          : '';
        this.imgUrlLogo = !valor.logo.includes('../../../../assets/img')
          ? valor.logo
          : '';
        this.linkImgPerfil = !valor.imgPerfil.includes('../../../../assets/img')
          ? valor.imgPerfil
          : '';
        this.linkImgDesktop = !valor.imgBanner.includes(
          '../../../../assets/img'
        )
          ? valor.imgBanner
          : '';
        this.linkImgMobile = !valor.imgBannerM.includes(
          '../../../../assets/img'
        )
          ? valor.imgBannerM
          : '';
        this.linkImgLogo = !valor.logo.includes('../../../../assets/img')
          ? valor.logo
          : '';
      });
  }

  activeModal() {
    let windowsModalStart = document.querySelector<HTMLElement>('.windowModal');
    let backgroundModalClose = document.querySelector<HTMLElement>(
      '.backgroundModalClose'
    );
    if (windowsModalStart && backgroundModalClose) {
      if (windowsModalStart.classList.contains('active')) {
        windowsModalStart.classList.remove('active');
        backgroundModalClose.classList.remove('active');
        this.modalService.tipoModal.emit('');
      } else {
        windowsModalStart.className += ' active';
        backgroundModalClose.className += ' active';
      }
    }
  }

  activarBoton(valor: boolean) {
    let btnEnviar = document.querySelector<HTMLElement>('.btnSubmit');
    console.log(btnEnviar);
    if (valor) {
      this.disabled = false;
      btnEnviar.classList.remove('disabled');
      console.log('activado');
    } else {
      this.disabled = true;
      btnEnviar.className += ' disabled';
      console.log('desactivado 2');
    }
  }

  async datosPersonales() {
    this.mensajeFinalizado = 'Guardando persona...';
    document
      .querySelector<HTMLElement>('.spinnerEnviar')
      .classList.remove('disabled');
    this.datosPersona = {
      usuariosByIdUsuario: this.datosPersona.usuariosByIdUsuario,
      nombre: this.formData.value.nombre,
      apellido: this.formData.value.apellido,
      profesion: this.formData.value.profesion,
      ciudad: this.formData.value.ciudad,
      pais: this.formData.value.pais,
      descripcion: this.formData.value.descripcion,
      imgPerfil: this.linkImgPerfil,
      imgBanner: this.linkImgDesktop,
      imgBannerM: this.linkImgMobile,
      logo: this.linkImgLogo,
      email: this.formData.value.email,
      linkedin: this.formData.value.linkedin,
      github: this.formData.value.github,
    };
    this.personaService
      .agregarPersona(this.idPersonaLog, this.datosPersona)
      .subscribe((valor) => {
        document.querySelector<HTMLElement>('.spinnerEnviar').className +=
          ' disabled';
        this.mensajeFinalizado = '✔ La persona ha sido agregada con exito!';
        this.personaService.getPersona(this.idPersonaLog);
        this.activeModal();
      });
  }

  mostrarImagen(event: any, destino: string) {
    this.activarBoton(false);
    let spinnerImg = '../../../../assets/img/spinner.gif';
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    if (destino == 'perfil') {
      this.imgUrlPerfil = spinnerImg;
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        console.log('antes');
        await this.db
          .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
          .then((urlImg: string) => {
            this.imgUrlPerfil = reader.result as string;
            this.linkImgPerfil = urlImg;
            this.activarBoton(true);
          });
      };
    } else if (destino == 'bannerDes') {
      this.imgUrlBannerD = spinnerImg;
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        await this.db
          .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
          .then((urlImg: string) => {
            this.imgUrlBannerD = reader.result as string;
            this.linkImgDesktop = urlImg;
            this.activarBoton(true);
          });
      };
    } else if (destino == 'logo') {
      this.imgUrlLogo = spinnerImg;
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        await this.db
          .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
          .then((urlImg: string) => {
            this.imgUrlLogo = reader.result as string;
            this.linkImgLogo = urlImg;
            this.activarBoton(true);
          });
      };
    } else {
      this.imgUrlBannerM = spinnerImg;
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        await this.db
          .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
          .then((urlImg: string) => {
            this.imgUrlBannerM = reader.result as string;
            this.linkImgMobile = urlImg;
            this.activarBoton(true);
          });
      };
    }
  }
}
