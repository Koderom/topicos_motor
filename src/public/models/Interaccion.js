import Escena from "./Escena";

class Interaccion extends Escenas{
    constructor(escena_id, indice, contexto, guion_id, idioma, texto, avatar_id){
        super(escena_id, indice, contexto, guion_id);
        this.id = id;
        this.idioma = idioma;
        this.texto = texto;
        this.avatar_id = avatar_id;
    }
}
export default Interaccion;