import Video from "./Video.js";
import Audio from "./Audio.js";
import Imagen from "./Imagen.js";
import { VideoService } from "../services/VideoService.js";
import { AudioService } from "../services/AudioService.js";
import { ImagenService } from "../services/ImagenService.js";
import Interaccion from "./Interaccion.js";
import { InteraccionService } from "../services/InteraccionService.js";
import { contenido } from '../scripts/contenido.js';

class Guion{
    constructor(titulo, programacion_id){
        this.id = null
        this.titulo = titulo;
        this.programacion_id = programacion_id;
        this.escenas = [];
        this.formulario;
    }

    static getInstanceFromObject(object){
        const mGion = new Guion(object.titulo, object.programacion_id);
        if(object.id) mGion.id = object.id;
        return mGion;
    }
    
    addEscena(escena){
        this.escenas.push(escena);
    }
    static async generarContenido (escena){
        if(escena instanceof Video){
            await VideoService.create(escena);
        }else if(escena instanceof Audio){
            await AudioService.create(escena);
        }else if(escena instanceof Imagen){
            await ImagenService.create(escena);
        }else if(escena instanceof Interaccion){
            await InteraccionService.create(escena);
        }
    }

    static async generarContenidoFromList(escenaList){
        try {
            await Promise.all(
                escenaList.map( async escena => {
                    await this.generarContenido(escena);
                    contenido.mostrarNotificacion(`Escena # ${escena.indice} fue subido correctamente`);
                })
            );
        } catch (error) {
            return error;
        }
    }

    
    
}

export default Guion;