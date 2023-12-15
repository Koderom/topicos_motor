const ProgramaService = {};
const authToken = localStorage.getItem('authToken');
import {config} from '../global/config.js';
const SERVER_API_URL = config.SERVER_API_URL;


ProgramaService.getData = async () => {
    try {
        let response = await fetch(`${SERVER_API_URL}/api/programa`, {
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

ProgramaService.create = async (formData) => {
    try {
        const formulario = new FormData(formData);

        let response = await fetch(`${SERVER_API_URL}/api/programa/create`, {
            method: "POST",
            body: formulario,
            headers: {
                "Authorization" : `Bearer ${authToken}`
            }
        });
        if(response.status == 200) return true;
        else return null;
    } catch (error) {
        return null;
    }
}

ProgramaService.cambiarEstadoEmision = async (idPrograma) => {
    try {
        let response = await fetch(`${SERVER_API_URL}/api/programa/estado/emision?idPrograma=${idPrograma}`, {
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
        console.log(error.message);
        throw error;
    }
}

ProgramaService.cambiarEstadoPendiente = async (idPrograma) => {
    try {
        let response = await fetch(`${SERVER_API_URL}/api/programa/estado/pendiente?idPrograma=${idPrograma}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        if(response.status != 200) throw new Error(response.text);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export {ProgramaService}