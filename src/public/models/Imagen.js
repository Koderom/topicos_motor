import Escena  from "./Escena.js";
class Imagen extends Escena{
    constructor(id, indice, contexto, descripcion, duracion,  guion_id){
        super(id, indice, contexto, guion_id);      
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.formulario = null;
        this.estado = 'C';
        this.generado = false;
        this.tipo_escena = 'I';
    }
}

export default Imagen;