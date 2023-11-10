import {config} from './../global/config.js';
const authToken = localStorage.getItem('authToken');
const SERVER_API_URL = config.SERVER_API_URL;

const PresentadorService = {};
PresentadorService.getAll = async () => {
    try {
        let response = await fetch(`${SERVER_API_URL}/api/presentador/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        let data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        return error;
    }
}

export {PresentadorService}