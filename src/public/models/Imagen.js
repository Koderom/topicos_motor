import Escena  from "./Escena.js";
class Imagen extends Escena{
    constructor(id, indice, contexto, descripcion, guion_id){
        super(id, indice, contexto, guion_id);      
        this.descripcion = descripcion;

        this.formulario = null;
        this.estado = 'C';
        this.generado = false;
    }
}

export default Imagen;