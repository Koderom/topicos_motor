import {config} from '../global/config.js';
const SERVER_API_URL = config.SERVER_API_URL;

const UsuarioService = {};
UsuarioService.login = async ({name, password}) => {
    const url = `${SERVER_API_URL}/api/login`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({name, password})
    };  
    const response = await fetch(url, options);

    if(!response.ok) throw new Error("WARN", response.status);
    const data = await response.json();
    return data;
}

export {UsuarioService}