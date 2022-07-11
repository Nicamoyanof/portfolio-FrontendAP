export class Proyecto{
    'nombre':string;
    'imgProyecto':string;
    'linkGithub':string;
    'url':string;
}
export class ProyectoHabilidad{
    'proyectos':number;
    'habilidades':number;
}

export class ProyectoCompleto{
    'idProyecto':number;
    'nombre':string;
    'imgProyecto':string;
    'linkGithub':string;
    'url':string;
    'habilidades': any[];
}