import{servicios} from './service.js';
const escenas = {}

escenas.addEscena = (escenasList, texto) => {
    if(texto.indexOf('#Avatar:') != -1){
        texto = texto.replace('#Avatar:', "");
        escenasList.push({tipo: 'I', descripcion: texto});
    }else if(texto.indexOf('#Musica:') != -1){
        texto = texto.replace('#Musica:', "");
        escenasList.push({tipo: 'A', descripcion: texto});
    }
    return escenasList;
}

escenas.generarContenido = async (escenasList) => {
    try {
        escenasList = await Promise.all(escenasList.map( async (escena) => {
            const archivo = await servicios.generarContenidoParaEscena(escena);
            escena.archivo = archivo;
            return escena;
        }));
        console.log(escenasList);
        return escenasList;    
    } catch (error) {
        return error;
    }
    
}


export {escenas};