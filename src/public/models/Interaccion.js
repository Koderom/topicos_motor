import Escena from "./Escena.js";

class Interaccion extends Escena{
    constructor(id, indice, contexto, idioma, texto,  guion_id, avatar_id){
        super(id, indice, contexto, guion_id);
        this.idioma = idioma;
        this.texto = texto;
        this.avatar_id = avatar_id;
        
        this.clip_id = null;
        this.formulario = null;
        this.estado = 'C';
        this.generado = false;
        this.tipo_escena = 'D';
    }
}
export default Interaccion;