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
    constructor(id, titulo){
        this.id = id;
        this.titulo = titulo;
        this.escenas = [];
        this.formulario;
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
                escenaList.forEach( async escena => {
                    await this.generarContenido(escena);
                    contenido.mostrarNotificacion(`Escena # ${escena.indice} fue subido correctamente`);
                })
            );
            alert("archivos subidos");
        } catch (error) {
            return error;
        }
    }

    
    
}

export default Guion;