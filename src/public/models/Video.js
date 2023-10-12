import Escena from "./Escena.js";

class Video extends Escena{
    constructor(escena_id, indice, contexto, titulo, autor, guion_id){
        super(escena_id, indice, contexto, guion_id);
        this.titulo = titulo;
        this.autor = autor;

        this.formulario = null;
        this.estado = 'C';
        this.generado = false;
        this.tipo_escena = 'V';
    }
}

export default Video;