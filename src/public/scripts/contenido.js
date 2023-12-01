import Escena from "../models/Escena.js";
import Video from "../models/Video.js";
const contenido = {}
import { eliminarEscena } from "../pages/guiones/index.js";
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

const modificadores = {
    'I': {text: "Imagen", color: '#63bdb3'},
    'V': {text: "Video", color: '#c68846'},
    'A': {text: "Audio", color: '#1c4e71'},
    'D': {text: "Interaccion", color: '#e33927'},
};
contenido.adicionarEscena = (escena) => {  
    const guion = document.getElementById('messages-container');
    const messageItem = document.createElement('div');
    messageItem.className = 'interacciones-card';
    messageItem.id=`escena_${escena.indice}`;
    // messageItem.addEventListener('click', (event) => {
    //     eliminarEscena(escena.indice);
    // });
    messageItem.innerHTML = `
    <div>
        <span class="interacciones-card-title">Escena # ${escena.indice} - tipo:${modificadores[escena.tipo_escena].text}</span> 
        <p class="interacciones-card-text">${escena.contexto}</p>
    </div>
    `;
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'interacciones-card-options';
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash', 'icon');
    deleteIcon.addEventListener('click', (event) => {
        eliminarEscena(escena.indice);
    });
    messageItem.addEventListener('mouseover', (event) => {
        deleteIcon.style.color = 'red';
    })
    messageItem.addEventListener('mouseout', (event) => {
        deleteIcon.style.color = 'white';
    })
    optionsContainer.appendChild(deleteIcon);
    messageItem.appendChild(optionsContainer);
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
    document.getElementById('archivo_container').innerHTML = '';
    //const escena_container = document.getElementById('escenas-container');
    //escena_container.innerHTML = "";
    guion.innerHTML = "";
}

contenido.adicionarArchivo = (escena) => {
    if(!escena.archivo)return;
    const archivo = escena.archivo;
    const escena_container = document.getElementById('archivo_container');
    const card = document.createElement('div');
    card.className = 'contenido_generado_card';
    const contenidoEscena = getContendioComponent(escena);
    const contenido = `
        <div class="contenido_generado_header">
            <span>${escena.indice}</span>
            <span>08:14</span>
        </div>
        <div class="contenido_generado_body">
            ${contenidoEscena}
            <div class="contenido_generado_title">${archivo.nombre}</div>
        </div>
    `;
    card.innerHTML = contenido;
    card.addEventListener('click', (evet) => cargarPrevisualizacion(escena));
    escena_container.appendChild(card);
}
function cargarPrevisualizacion(escena){
    const container = document.getElementById('previsualizador_container');
    let contendioComponent = ``;
    switch(escena.tipo_escena){
        case'V' : 
            contendioComponent = `
                <video class="previsualizador " controls>
                    <source src="./../../storage/${escena.archivo.nombre}" type="video/mp4">
                    Tu navegador no soporta la etiqueta de video.
                </video>
            `;
        break;
        case'I' :
            contendioComponent = `
            <img class="previsualizador" src="./../../storage/${escena.archivo.nombre}" alt="">
            `;
        break;
        case'D' : 
            contendioComponent = `
                <video class="previsualizador " controls>
                    <source src="./../../storage/${escena.archivo.nombre}" type="video/mp4">
                    Tu navegador no soporta la etiqueta de video.
                </video>
            `;
        break;
        case'A':
        console.log(escena)
        contendioComponent = `
        <video class="previsualizador " poster="./../../storage/${escena.portada||'defaul_music_image.jpg'}" controls>
            <source src="./../../storage/${escena.archivo.nombre}" type="video/mp4">
            Tu navegador no soporta la etiqueta de video.
        </video>
        `;
        break;
    }
    container.innerHTML = contendioComponent;
}
function getContendioComponent(escena){
    let contendioComponent = ``;
    switch(escena.tipo_escena){
        case'V' : 
            contendioComponent = `
                <video class="contenido_generado">
                    <source src="./../../storage/${escena.archivo.nombre}" type="video/mp4">
                    Tu navegador no soporta la etiqueta de video.
                </video>
            `;
        break;
        case'I' :
            contendioComponent = `
            <img class="contenido_generado" src="./../../storage/${escena.archivo.nombre}" alt="">
            `;
        break;
        case'D' : 
            contendioComponent = `
                <video class="contenido_generado">
                    <source src="./../../storage/${escena.archivo.nombre}" type="video/mp4">
                    Tu navegador no soporta la etiqueta de video.
                </video>
            `;
        break;
        case'A':
        contendioComponent = `
        <video class="contenido_generado" poster="./../../storage/${escena.portada||'defaul_music_image.jpg'}">
            <source src="./../../storage/${escena.archivo.nombre}" type="video/mp4">
            Tu navegador no soporta la etiqueta de video.
        </video>
        `;
        break;
    }
    return contendioComponent;
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