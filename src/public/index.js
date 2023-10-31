import {routes} from './global/routes.js'

const btnIniciarSesion = document.getElementById('btn_iniciar_sesion');
btnIniciarSesion.addEventListener('click', onClickIniciarSesion);


function onClickIniciarSesion(event){
    console.log('click');
    routes.goToRoute(routes.LOGIN, null);
}