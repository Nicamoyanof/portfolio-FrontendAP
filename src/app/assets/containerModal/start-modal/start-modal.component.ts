import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { Persona } from 'src/app/models/personas';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-start-modal',
  templateUrl: './start-modal.component.html',
  styleUrls: ['./start-modal.component.css']
})
export class StartModalComponent implements OnInit {
  faPlus = faPlus;
  linkImgPerfil: string;
  linkImgDesktop: string;
  linkImgMobile: string
  linkImgLogo: string;
  imgUrlPerfil: string = '';
  imgUrlBannerD: string = '';
  imgUrlBannerM: string = '';
  imgUrlLogo: string = '';

  arrPersonaProfesion:any[]=[] ;
  arrPersonaDescripcion:any[]=[] ;

  personaLoged:any;

  formData: FormGroup;

  userLogged:any = jwtDecode(localStorage.getItem('auth_token'));

  constructor(
    private fb: FormBuilder,
    private personaService: PersonasService,
    private db: FireStorageService
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      apellido: ['', []],
      profesion: ['', []],
      ciudad: ['', []],
      pais: ['', []],
      descripcion: ['', []],
      imgPerfil: ['', []],
      imgBanner: ['', []],
      imgBannerM: ['', []],
      logo: ['', []],
      email: ['', []],
      linkedin: ['', []],
      github: ['', []],
    });
  }
  ngOnInit(): void {  }

  activeModal() {
    let windowsModalStart =
      document.querySelector<HTMLElement>('.windowsModalStart');
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

  async datosPersonales() {
    let datosPersona: Persona = {
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

    this.personaService.agregarPersona(this.userLogged.user, datosPersona);
  }

  mostrarImagen(event: any, destino: string) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    const reader = new FileReader();
    if (destino == 'perfil') {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        this.imgUrlPerfil = reader.result as string;
        console.log('antes');
        await this.db
          .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
          .then((urlImg: string) => {
            this.linkImgPerfil = urlImg;
            console.log('subido');
          });
      };
    } else if (destino == 'bannerDes') {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        this.imgUrlBannerD = reader.result as string;
        await this.db
          .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
          .then((urlImg: string) => {
            this.linkImgDesktop = urlImg;
          });
      };
    } else if (destino == 'logo') {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        this.imgUrlLogo = reader.result as string;
        await this.db
          .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
          .then((urlImg: string) => {
            this.linkImgLogo = urlImg;
          });
      };
    } else {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        this.imgUrlBannerM = reader.result as string;

        await this.db
          .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
          .then((urlImg: string) => {
            this.linkImgMobile = urlImg;
          });
      };
    }
  }

}
