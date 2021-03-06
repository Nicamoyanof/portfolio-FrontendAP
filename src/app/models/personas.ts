import { Byte } from "@angular/compiler/src/util";

export class Persona{
    'usuariosByIdUsuario':number;
    'nombre':string;
    'apellido':string;
    'profesion':string;
    'ciudad':string;
    'pais':string;
    'descripcion':string;
    'imgPerfil':string;
    'imgBanner':string;
    'imgBannerM':string;
    'logo':string;
    'email':string;
    'linkedin':string;
    'github':string;
}

export class PersonaHabilidad{
    'persona':number;
    'habilidad':number;
    'porcentaje':number;
}
export class PersonaProyecto{
    'persona':number;
    'proyecto':number;
}