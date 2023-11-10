import Guion from './../models/Guion.js';

const GuionService = {};
const authToken = localStorage.getItem('authToken');

GuionService.getData = async (guion_id) => {
    try {
        let response = await fetch(`http://localhost:3035/api/guion?guion_id=${guion_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        let data = await response.json();
        const mGuion = parseResponseToGuion(data);
        return mGuion;
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
    const mGuion = new Guion();
    mGuion.id = object.id;
    mGuion.titulo = object.titulo;
    mGuion.programacion_id = object.programacion_id;
    mGuion.escenas = object.escenas;
    return mGuion;
}

export {GuionService}