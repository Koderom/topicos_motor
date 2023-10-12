class Programa{
    constructor(titulo, descripcion, genero, clasificacion, fecha_inicio, estado, horario_emision, duracion){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.genero = genero;
        this.clasificacion = clasificacion;
        this.fecha_inicio = fecha_inicio;
        this.estado = estado;
        this.horario_emision = horario_emision;
        this.duracion = duracion;
    }
    static getInstanceFromObject(object) {
        return new Programa(object.titulo, object.genero, object.clasificacion, object.fecha_inicio, object.estado, object.horario_emision, object.duracion);
    }
}

export default Programa;