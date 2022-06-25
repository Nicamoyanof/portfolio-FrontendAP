import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Educacion, EducacionAgregar } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.css']
})
export class EducationModalComponent implements OnInit {

  faPlusEdu = faPlus;
  faCheckEdu = faCheck;
  formData: FormGroup;
  formDataAgregar: FormGroup;
  imgUrlLogo: string = '';
  linkImgLogo: string;
  listaEdu: any;
  selectedOption: any;
  listaEstudiosPersonas: any[];

  constructor(
    private router: Router,
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
      intituto: '',
      anioInicio: '',
      anioFinal: '',
    });
  }

  async ngOnInit() { }


  agregarEducacion() {
    let educacion: Educacion = {
      nombreInstituto: this.formData.value.nombre,
      tituloInstituto: this.formData.value.titulo,
      logo: this.linkImgLogo,
    };
    this.educacionService.agregarEducacion(educacion);
  }

  mostrarImagen(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      this.imgUrlLogo = reader.result as string;
      console.log('antes');
      await this.db
        .subirImgStorage('logoEducacion', Date.now() + file.name, reader.result)
        .then((urlImg: string) => {
          this.linkImgLogo = urlImg;
          console.log('subido');
        });
    };
  }

  unirPersonaEdu() {
    let educacionAgregar: EducacionAgregar = {
      personas: 2,
      educaciones: this.selectedOption,
      anioInicio: Number(this.formDataAgregar.value.anioInicio),
      anioFinal: Number(
        this.formDataAgregar.value.anioFinal != 0
          ? this.formDataAgregar.value.anioFinal
          : ''
      ),
    };

    this.personaService.educacionPersona(educacionAgregar);
  }

  selectValor(event: any) {
    this.selectedOption = event.value;
  }

}