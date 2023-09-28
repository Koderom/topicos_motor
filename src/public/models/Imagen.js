import Escena  from "./Escena";
class Imagen{
    constructor(escena_id, indice, contexto, guion_id, descripcion){
        super(escena_id, indice, contexto, guion_id);      
        this.descripcion = descripcion;
    }
}

export default Imagen;