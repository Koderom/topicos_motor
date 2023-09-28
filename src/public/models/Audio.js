import Escena from './Escena';

class Audio extends Escena{
    constructor(escena_id, indice, contexto, autor, genero, guion_id){
        super(escena_id, indice, contexto, guion_id);
        this.autor = autor;
        this.genero = genero;
    }
}

export default Audio;