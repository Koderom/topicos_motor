const ProgramaService = {};

ProgramaService.getData = async () => {
    try {
        let response = await fetch(`http://localhost:3035/api/programa`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        let data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export {ProgramaService}