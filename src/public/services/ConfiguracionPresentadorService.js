const authToken = localStorage.getItem('authToken');

const ConfiguracionPresentadorService = {};
ConfiguracionPresentadorService.create = async (dataForm) => {
    try {
        const formulario = new FormData(dataForm);
        const url = 'http://localhost:3035/api/configuracionPresentador/create';
        const options = {
            method: 'POST', body: formulario,
            headers:{
                "Authorization" : `Bearer ${authToken}`
            }
        };
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("WARN", response.status);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
}

export {ConfiguracionPresentadorService}