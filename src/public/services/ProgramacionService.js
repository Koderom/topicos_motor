const ProgramacionService = {};
const authToken = localStorage.getItem('authToken');

ProgramacionService.getProgramacion = async (idProgramacion) => {
    try {
        let response = await fetch(`http://localhost:3035/api/programacion/get-programacion?idProgramacion=${idProgramacion}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        let data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

ProgramacionService.getData = async (idPrograma) => {
    try {
        let response = await fetch(`http://localhost:3035/api/programacion?idPrograma=${idPrograma}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        let data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
ProgramacionService.getPrograma = async (idProgramacion) => {
    try {
        let response = await fetch(`http://localhost:3035/api/programacion/get_programa?idProgramacion=${idProgramacion}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        let data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
ProgramacionService.create = async (formData) => {
    try {
        
        let response = await fetch(`http://localhost:3035/api/programacion/create`, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization" : `Bearer ${authToken}`
            }
        });
        if(response.redirected){
            window.location.href = response.url;
        }
    } catch (error) {
        return error;
    }
}


export {ProgramacionService}