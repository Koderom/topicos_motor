import { UsuarioService } from "../../services/UsuarioService.js";
import {routes} from '../../global/routes.js'

const infoMessge = document.getElementById('infoMessage');
const formularioLogin = document.getElementById('form-login');

formularioLogin.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        const data = event.target;
        const name = data['name'].value;
        const password = data['password'].value;
        infoMessge.innerHTML = "";
        const response = await UsuarioService.login({name, password});
        
        localStorage.setItem('authToken', response.token);
        routes.goToRoute(routes.PROGRAMAS);
    } catch (error) {
        infoMessge.innerHTML = "Error al iniciar sesion";
    }
})