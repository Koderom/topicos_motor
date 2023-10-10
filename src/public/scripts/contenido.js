import Escena from "../models/Escena.js";
import Video from "../models/Video.js";
const contenido = {}
import { eliminarEscena } from "../index.js";
// contenido.adicionarEscena = (escena) => {
//     const guion = document.getElementById('messages-container');
//     const messageItem = document.createElement('div');
//     let tipo = '';
//     if(escena.tipo == 'A') tipo = '#Musica:';
//     else if(escena.tipo == 'I') tipo = '#Avatar';
//     messageItem.className = 'message';
//     messageItem.innerHTML = `<b>${tipo}</b> ${escena.descripcion}`;
//     guion.appendChild(messageItem);

//     if(escena.archivo) contenido.adicionarArchivo(escena.archivo);
// };
contenido.adicionarEscenaVideo = (video) => {
    if(video instanceof Video){
        const guion = document.getElementById('messages-container');
        const messageItem = document.createElement('div');
        messageItem.className = 'card';
        messageItem.innerHTML = `
        <div class="card">
            <span class="card__title">${video.titulo} <span> - ${video.autor}</span> </span> 
            <p class="card__text">${video.contexto}</p>
            <button class="card__button">Subscribe</button>
        </div>
        `;
        guion.appendChild(messageItem);
    }
}
contenido.adicionarEscena = (escena) => {
    const guion = document.getElementById('messages-container');
    const messageItem = document.createElement('div');
    messageItem.className = 'card';
    messageItem.id=`escena_${escena.indice}`;
    messageItem.addEventListener('click', (event) => {
        eliminarEscena(escena.indice);
    });
    messageItem.innerHTML = `
    <div class="card">
        <span class="card__title">Escena # ${escena.indice} </span> 
        <p class="card__text">${escena.contexto}</p>
        
    </div>
    `;
    guion.appendChild(messageItem);
}
contenido.borrarEscenaItem = (escena_indice) => {
    console.log('se preciono borrar');
    const itemEscena = document.getElementById(`escena_${escena_indice}`);
    const guion = document.getElementById('messages-container');
    guion.removeChild(itemEscena);
}
contenido.limpiar = () => {
    const guion = document.getElementById('messages-container');
    const escena_container = document.getElementById('escenas-container');
    escena_container.innerHTML = "";
    guion.innerHTML = "";
}
contenido.adicionarArchivo = (escena) => {
    if(!escena.archivo)return;
    const escena_container = document.getElementById('escenas-container');
    const escenaItem = document.createElement('div');
    escenaItem.className = 'escena';
    const archivo = escena.archivo;
    escenaItem.innerHTML = `
        <p>
            Escena#${escena.indice} - Nombre: ${archivo.nombre} - PATH: ${archivo.local_path}
        </p>
    `;
    escenaItem.addEventListener('click', (event) => {
        
    });
    escena_container.appendChild(escenaItem);    
}

// contenido.adicionarArchivo = (archivo) => {
//     const escena_container = document.getElementById('escenas-container');
//     const escenaItem = document.createElement('div');
//     escenaItem.className = 'escena';
//     escenaItem.innerHTML = `
//         <img src="${archivo.url_portada}" class="escena-image"/>
//     `;
//     escenaItem.addEventListener('click', (event) => {
//         console.log(`${archivo.nombre}.${archivo.tipo}`);
//     });
//     escena_container.appendChild(escenaItem);
// }

contenido.mostrarNotificacion = (textoNoticacion) => {
    const contenedor = document.getElementById('notificacion-container');
    const contenerdor_message = document.getElementById('notificacion-text-container');
    const message = document.getElementById('notificacion');

    message.innerHTML = textoNoticacion;
    contenedor.style.display = 'flex';

    contenerdor_message.addEventListener('click',(event)=>{
        contenedor.style.display = 'none';
    });
}
contenido.showRefreshNotifycation = () => {
    const notifycationContainer = document.getElementById('refresh-content-notifycation');
    notifycationContainer.style.display = 'flex';
}

contenido.cargarDatosVista = (mGuion) => {
    const escena_container = document.getElementById('escenas-container');
    const guion = document.getElementById('messages-container');
    escena_container.innerHTML = "";
    guion.innerHTML = "";
    const escenas = mGuion.escenas;
    for(let escena of escenas) contenido.adicionarEscena(escena);
};
export {contenido};