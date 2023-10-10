const InteraccionService = {};

InteraccionService.create = async (interaccion) => {
    try {
        const formulario = new FormData(interaccion.formulario);
        console.log(formulario);
        formulario.append('interaccion-indice', interaccion.indice);
        formulario.append('interaccion-guion-id', interaccion.guion_id);
        const url = 'http://127.0.0.1:3035/api/interaccion/create';
        const options = {
            method: 'POST', 
            body: formulario, 
            //headers: {"Content-Type": "application/json"}
        };
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("WARN", response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export {InteraccionService}