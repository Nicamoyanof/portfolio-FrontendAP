import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { PersonaHabilidad } from 'src/app/models/personas';
import { Skill } from 'src/app/models/skill';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ModalService } from 'src/app/service/modal.service';
import { PersonasService } from 'src/app/service/personas.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.css'],
})
export class SkillModalComponent implements OnInit {
  faPlus = faPlus;
  imgUrlPerfil: string = '';
  formData: FormGroup;
  linkImgLogo: string;
  listSkills: any[];
  selectedOption: number;
  formAgregarSkill: FormGroup;
  listSkillPersona: any[];
  disabled: boolean = false;
  mensajeFinalizado: string;
  @Input() personaLog: number;

  @Input() valorModal: string;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonasService,
    private skillService: SkillService,
    private db: FireStorageService
  ) {
    this.formData = this.fb.group({
      nombre: ['', []],
      logo: ['', []],
      porcentaje: ['', []],
    });

    this.formAgregarSkill = fb.group({
      persona: '',
      habilidad: '',
      porcentaje: '',
    });
  }

  ngOnInit(): void {
    this.getAllSkill();
  }

  getAllSkill() {
    this.skillService
      .getAllSkill()
      .subscribe((res: any[]) => (this.listSkills = res));
  }

  activeModalSkill() {
    let windowsModalStart = document.querySelector<HTMLElement>(
      '.windowsModalStartSkill'
    );
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

  agregarSkill() {
    this.mensajeFinalizado = 'Guardando persona...';
    document
      .querySelector<HTMLElement>('.spinnerEnviar')
      .classList.remove('disabled');
    let skill: Skill = {
      nombre: this.formData.value.nombre,
      logo: this.linkImgLogo,
    };
    this.skillService.agregarSkill(skill).subscribe((e) => {
      this.mensajeFinalizado = 'Se creo la habilidad';
      document.querySelector<HTMLElement>('.spinnerEnviar').className+=' disabled';
    });
    this.getAllSkill();
  }

  agregarSkillPersona() {
    this.mensajeFinalizado = 'Guardando persona...';
    document
      .querySelector<HTMLElement>('.spinnerEnviar')
      .classList.remove('disabled');
    let agregarHabilidadPersona: PersonaHabilidad = {
      persona: this.personaLog,
      habilidad: Number(this.selectedOption),
      porcentaje: Number(this.formAgregarSkill.value.porcentaje),
    };

    this.personaService.agregarHabilidadPersona(agregarHabilidadPersona).subscribe(e=>{
      this.mensajeFinalizado = 'Se agrego la habilidad con exito!';
      document.querySelector<HTMLElement>('.spinnerEnviar').className+=' disabled';
      this.personaService.getHabilidadesPersona(this.personaLog).subscribe(e=>{
        this.personaService.personaHabilidad.emit(e)
      })
    })
    
  }

  activeModalCreaSkill() {
    let windowsModalStart = document.querySelector<HTMLElement>(
      '.windowsModalStartCrearSkill'
    );
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
  activarBoton(valor: boolean) {
    let btnEnviar = document.querySelector<HTMLElement>('.btnSubmit');
    if (valor) {
      this.disabled = false;
      btnEnviar.classList.remove('disabled');
    } else {
      this.disabled = true;
      btnEnviar.className += ' disabled';
    }
  }
  mostrarImagen(event: any, destino: string) {
    let spinnerImg = '../../../../assets/img/spinner.gif';
    this.activarBoton(false);
    this.imgUrlPerfil = spinnerImg;
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      await this.db
        .subirImgStorage('imgPersona', Date.now() + file.name, reader.result)
        .then((urlImg: string) => {
          this.imgUrlPerfil = reader.result as string;
          this.linkImgLogo = urlImg;
          this.activarBoton(true);
        });
    };
  }

  selectValor(event: any) {
    this.selectedOption = event.value;
  }
}
