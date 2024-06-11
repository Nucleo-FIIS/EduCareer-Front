export interface CursoProfesor {
    nombre_carrera: string;
    nombre_curso: string;
    nombre_ciclo: string;
    profesores:   Profesore[];
}

export interface Profesore {
    id_profesor:     number;
    img_profesor:    string;
    nombre_completo: string;
    first_last_name: string;
    slug:            string;
}