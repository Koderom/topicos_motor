import { contenido } from './contenido.js';
import { servicios } from './service.js';

const guion = {};

guion.guardar = async (mGuion) => {
    try {
        if(mGuion.id) await guion.actualizar(mGuion);
        else {
            const id = await guion.nuevo(mGuion);
            return id;
        }
    } catch (error) {
        return error;
    }
}

guion.actualizar = async (mGuion) => {
    try {
        await servicios.actualizar(mGuion);
    } catch (error) {
        return error;    
    }
}

guion.nuevo = async (mGuion) => {
    try {
        const id = await servicios.nuevo(mGuion);
        return id;
    } catch (error) {
        return error;    
    }
}

guion.cargar = async (mGuion) => {
    try {
        const guionCargado = await servicios.cargar(mGuion);
        contenido.mostrarNotificacion('Datos guardados exitosamente')
        return guionCargado;
    } catch (error) {
        return error;
    }
}

export {guion};