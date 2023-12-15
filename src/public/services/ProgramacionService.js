const ProgramacionService = {};
const authToken = localStorage.getItem('authToken');
import {config} from '../global/config.js';
const SERVER_API_URL = config.SERVER_API_URL;

ProgramacionService.getProgramacion = async (idProgramacion) => {
    try {
        let response = await fetch(`http://localhost:3035/api/programacion/get-programacion?idProgramacion=${idProgramacion}`, {
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

ProgramacionService.getData = async (idPrograma) => {
    try {
        let response = await fetch(`http://localhost:3035/api/programacion?idPrograma=${idPrograma}`, {
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
ProgramacionService.getPrograma = async (idProgramacion) => {
    try {
        let response = await fetch(`http://localhost:3035/api/programacion/get_programa?idProgramacion=${idProgramacion}`, {
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
ProgramacionService.create = async (formData) => {
    try {
        
        let response = await fetch(`http://localhost:3035/api/programacion/create`, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization" : `Bearer ${authToken}`
            }
        });
        if(response.redirected){
            window.location.href = response.url;
        }
    } catch (error) {
        return error;
    }
}

ProgramacionService.iniciandoReproduccion = async (idProgramacion) => {
    try {
        let response = await fetch(`${SERVER_API_URL}/api/programacion/reproduciendo/iniciando?idProgramacion=${idProgramacion}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        console.log(response);
        if(response.status != 200) throw new Error(response.text);
        return true;
    } catch (error) {
        throw error;
    }
}
ProgramacionService.finalizandoReproduccion = async (idProgramacion) => {
    try {
        let response = await fetch(`${SERVER_API_URL}/reproduciendo/iniciando?idProgramacion=${idProgramacion}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        if(response.status != 200) throw new Error(response.text);
        return true;
    } catch (error) {
        throw error;
    }
}

export {ProgramacionService}