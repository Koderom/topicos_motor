const ProgramacionService = {};

ProgramacionService.getData = async (idPrograma) => {
    try {
        let response = await fetch(`http://localhost:3035/api/programacion?idPrograma=${idPrograma}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        let data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export {ProgramacionService}