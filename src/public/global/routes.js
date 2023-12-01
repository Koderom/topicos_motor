import {config} from './config.js';
const baseRoute = config.SERVER_API_URL;

const routes = {}

routes.LOGIN = 'login';
routes.PROGRAMAS = 'programas';
routes.PRESENTADORES = 'presentadores'
routes.PROGRAMACIONES = 'programaciones'
routes.REPRODUCTOR = 'reproductor'

routes.login = (params) => {
    return `${baseRoute}/pages/login`;
}
routes.programas = (params) => {
    return `${baseRoute}/pages/programas`;
}

routes.presentadores = (params) => {
    return `${baseRoute}/pages/presentadores`;
}
routes.programaciones = (params) => {
    return `${baseRoute}/pages/programaciones/programaciones.html?idPrograma=${params.idPrograma}`;
}
routes.reproductor = (params) => {
    return `${baseRoute}/pages/reproductor/index.html?idProgramacion=${params.idProgramacion}`;
}

routes.goToRoute = (name, params) => {
    window.location.href = routes[name](params);
}
export {routes}