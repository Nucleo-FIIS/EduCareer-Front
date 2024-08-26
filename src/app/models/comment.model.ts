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


export interface ComentarioAdm{
    id_comentario:number;
    usuario:String;
    img_user:String;
    comentario:String;
    fecha:String;
    referencia:String;
    tipo_comentario:String;
    id_estado:number;
    img_operario:any;
    operario:any;
}