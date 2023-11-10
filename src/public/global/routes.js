import {config} from './config.js';
const baseRoute = config.SERVER_API_URL;

const routes = {}

routes.LOGIN = 'login';
routes.PROGRAMAS = 'programas';
routes.PRESENTADORES = 'presentadores'

routes.login = (params) => {
    return `${baseRoute}/pages/login`;
}
routes.programas = (params) => {
    return `${baseRoute}/pages/programas`;
}

routes.presentadores = (params) => {
    return `${baseRoute}/pages/presentadores`;
}

routes.goToRoute = (name, params) => {
    window.location.href = routes[name](params);
}
export {routes}