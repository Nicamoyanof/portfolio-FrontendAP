import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { Educacion, EducacionAgregar } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ModalService } from 'src/app/service/modal.service';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.css'],
})
export class EducationModalComponent implements OnInit {
  faPlusEdu = faPlus;
  faCheckEdu = faCheck;
  formData: FormGroup;
  formDataAgregar: FormGroup;
  formDataEditar:FormGroup;
  imgUrlLogo: string = '';
  linkImgLogo: string;
  listaEdu: any;
  selectedOption: any;
  listaEstudiosPersonas: any[];
  disabled: boolean = false;
  mensajeFinalizado: string = '';
  estudioSeleccionadoId: any;
  estudioSeleccionado: any;

  @Input() personaLog:number;

  @Input() valorModal: string;
  @Input() estudioEliminar: number;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private personaService: PersonasService,
    private educacionService: EducacionService,
    private db: FireStorageService
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      titulo: ['', []],
      anioInicio: ['', []],
      anioFinal: ['', []],
      logo: ['', []],
    });

    this.formDataAgregar = this.fb.group({
      persona: '',
      instituto: '',
      anioInicio: '',
      anioFinal: '',
    });
    this.formDataEditar = this.fb.group({
      persona: '',
      instituto: '',
      anioInicio: '',
      anioFinal: '',
    });
  }

  async ngOnInit() {
    this.educacionService.getEducaciones();
    this.educacionService.educacionesEmitter.subscribe((valor) => {
      this.listaEdu = valor;
    });
    this.personaService.estudioSeleccionado.subscribe((valor: any) => {
      this.estudioSeleccionadoId = valor;
      this.personaService.getEstudioPersona(valor);
      this.personaService.estudioEditar.subscribe((e) => {
        this.estudioSeleccionado = e;
        this.formDataEditar.controls['instituto'].setValue(2)
        this.formDataEditar.controls['anioFinal'].setValue(2)
      });
    });
  }

  agregarEducacion() {
    this.mensajeFinalizado = 'Guardando persona...';
    document
      .querySelector<HTMLElement>('.spinnerEnviar')
      .classList.remove('disabled');
    let educacion: Educacion = {
      nombreInstituto: this.formData.value.nombre,
      tituloInstituto: this.formData.value.titulo,
      logo: this.linkImgLogo,
    };
    this.educacionService.agregarEducacion(educacion).subscribe((valor) => {
      document.querySelector<HTMLElement>('.spinnerEnviar').className +=
        ' disabled';
      this.mensajeFinalizado = '✔ Educacion creada con exito!';
      setTimeout(() => {
        this.activeModal();
      }, 1000);
    });
  }

  activarBoton(valor: boolean) {
    let btnEnviar = document.querySelector<HTMLElement>('.btnSubmit');
    console.log(btnEnviar);
    if (valor) {
      this.disabled = false;
      btnEnviar.classList.remove('disabled');
    } else {
      this.disabled = true;
      btnEnviar.className += ' disabled';
      console.log('desactivado 2');
    }
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

  mostrarImagen(event: any) {
    let spinnerImg = '../../../../assets/img/spinner.gif';
    this.activarBoton(false);
    this.imgUrlLogo = spinnerImg;
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      console.log('antes');
      await this.db
        .subirImgStorage('logoEducacion', Date.now() + file.name, reader.result)
        .then((urlImg: string) => {
          this.imgUrlLogo = reader.result as string;
          this.linkImgLogo = urlImg;
          this.activarBoton(true);
        });
    };
  }

  unirPersonaEdu() {
    this.mensajeFinalizado = 'Guardando persona...';
    document
      .querySelector<HTMLElement>('.spinnerEnviar')
      .classList.remove('disabled');
    let educacionAgregar: EducacionAgregar = {
      personas: this.personaLog,
      educaciones: this.selectedOption,
      anioInicio: Number(this.formDataAgregar.value.anioInicio),
      anioFinal: Number(
        this.formDataAgregar.value.anioFinal != 0
          ? this.formDataAgregar.value.anioFinal
          : ''
      ),
    };

    this.personaService
      .educacionPersona(educacionAgregar)
      .subscribe((valor) => {
        document.querySelector<HTMLElement>('.spinnerEnviar').className +=
          ' disabled';
        this.mensajeFinalizado = '✔ Educacion creada con exito!';

        this.personaService.getEstudiosPersona(this.personaLog);
        setTimeout(() => {
          this.activeModal();
        }, 1000);
      });
  }

  eliminarEstudio() {
    this.personaService
      .eliminarEstudioPersona(this.estudioEliminar)
      .subscribe((res) => {
        this.personaService.getEstudiosPersona(this.personaLog);
        this.activeModal();
      });
  }

  selectValor(event: any) {
    this.selectedOption = event.value;
  }
}
