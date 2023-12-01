//import { contenidoToLoad, contenidoLoaded } from "../reproductor.js";
class CargarContenidoTask{
    constructor(contenidoToLoad){
        this.contenidoToLoad = contenidoToLoad;
        this.observadores = [];
    }
    /*---------------------------------- */
    async start() {
        this.#cargarContenido();
    }
    
    
    #cargarContenido(){
        if(this.contenidoToLoad.length != 0){
            this.#cargarComponente(this.contenidoToLoad.shift());
        }else{
            this.notificar('onEnded', 'terminado');
        }
        // else{
        //     console.log("verificando lista de carga")
        //     setTimeout(cargarContenido, 200);
        // }
    }
    
    #cargarComponente(escena){
        console.log("cargando escena " + escena.indice)
        let contenido = null;
        switch(escena.tipo_escena){
            case 'V' : contenido = this.#cargarEscenaVideo(escena); break;
            case 'I' : contenido = this.#cargarEscenaImagen(escena); break;
            case 'D' : contenido = this.#cargarEscenaVideo(escena); break;
            case 'A' : contenido = this.#cargarEscenaAudio(escena); break;
            default: this.#cargarContenido();
        }
        this.notificar('onContenidoCargado', contenido);
        //contenidoLoaded.push(contenido);
    }
    
    #cargarEscenaVideo(contenido){
        const reproductor = document.createElement('video');
        reproductor.autoplay = true;
        reproductor.className = 'reproductor';
        reproductor.controls = true;
        reproductor.innerHTML = `<source src="./../../../storage/${contenido.archivo.nombre}" type="video/mp4">`
        reproductor.addEventListener('canplay', (event) => { this.#cargarContenido()})
        reproductor.pause();
        const result = {reproductor, tipo: 'V'}
        return result;
    }
    
    #cargarEscenaAudio(contenido){
        
        const reproductor = document.createElement('video');
        reproductor.autoplay = true;
        reproductor.className = 'reproductor';
        reproductor.controls = true;
        reproductor.poster = `./../../storage/${contenido.portada||'defaul_music_image.jpg'}`
        reproductor.innerHTML = `<source src="./../../../storage/${contenido.archivo.nombre}" type="video/mp4">`
        reproductor.addEventListener('canplay', (event) => { this.#cargarContenido() }) 
        reproductor.pause();
    
        const result = {reproductor, tipo: 'A'}
        return result;
    }
    
    #cargarEscenaImagen(contenido){
        const reproductor = document.createElement('img');
        reproductor.className = 'reproductor_img';
        reproductor.src = './../../storage/'+contenido.archivo.nombre;
        const result = {reproductor, tipo: 'I', duracion: contenido.duracion}
        return result;
    }
    
    /*---------------------------------- */
    agregarObservador(observador) {
        this.observadores.push(observador);
    }
    eliminarObservador(observador) {
        this.observadores = this.observadores.filter(obs => obs !== observador);
    }
    notificar(evento, datos) {
        this.observadores.forEach(observador => observador.actualizar(evento, datos));
    }
}

export default CargarContenidoTask;

