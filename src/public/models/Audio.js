import Escena from './Escena.js';

class Audio extends Escena{
    constructor(escena_id, indice, titulo, contexto, autor, genero, guion_id){
        super(escena_id, indice, contexto, guion_id);
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;

        this.tipo_escena = 'A';
        this.formulario = null;
        this.estado = 'C';
        this.generado = false;
    }
}

export default Audio;