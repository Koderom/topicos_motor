const ImagenService = {};
const authToken = localStorage.getItem('authToken');

ImagenService.create = async (imagen) => {
    try {
        const formulario = new FormData(imagen.formulario);
        formulario.append('imagen-indice', imagen.indice);
        formulario.append('imagen-guion-id', imagen.guion_id);
        const url = 'http://127.0.0.1:3035/api/imagen/create';
        const options = {
            method: 'POST', body: formulario,
            headers:{
                "Authorization" : `Bearer ${authToken}`
            }
        };
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("WARN", response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export {ImagenService}