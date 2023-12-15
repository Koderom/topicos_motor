import { escenas } from '../scripts/escenas.js';
import Guion from './../models/Guion.js';

const GuionService = {};
const authToken = localStorage.getItem('authToken');

GuionService.getGuion = async (idProgramacion) => {
    try {
        let response = await fetch(`http://localhost:3035/api/guion/get-guion?idProgramacion=${idProgramacion}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        if(response.status == 200){
            let data = await response.json();
            const mGuion = parseResponseToGuion(data);
            return mGuion;
        }else throw new Error("Guion service: Error al obtener los datos");        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

GuionService.getData = async (guion_id) => {
    try {
        let response = await fetch(`http://localhost:3035/api/guion?guion_id=${guion_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        if(response.status == 200){
            let data = await response.json();
            const mGuion = parseResponseToGuion(data);
            return mGuion;
        }else throw new Error("Guion service: Error al obtener los datos");        
    } catch (error) {
        throw error;
    }
}
GuionService.getProgramacion = async (guion_id) => {
    try {
        
        let response = await fetch(`http://localhost:3035/api/guion/programacion?idGuion=${guion_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        let data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

function parseResponseToGuion(object){
    const escenas = object.escenas;
    console.log(object);
    escenas.forEach(escena => escena.estado = 'R');

    const mGuion = new Guion();
    //const mGuion = {}
    mGuion.id = object.id;
    mGuion.titulo = object.titulo;
    mGuion.programacion_id = object.programacion_id;
    mGuion.escenas = escenas;
    return mGuion;
}

export {GuionService}