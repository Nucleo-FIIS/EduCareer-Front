export interface ComentarioProfesor {
    id_user:              number;
    nombre_user:          string;
    img_user:             string;
    fecha_creacion:       string;
    comentario:           string;
    score:                number;
    reply_to:             null | string;
    parent_comentario_id: number | null;
    replies:              number[];
}