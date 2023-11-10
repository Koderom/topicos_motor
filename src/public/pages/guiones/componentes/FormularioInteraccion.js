const FormularioInteraccion = {};

FormularioEscena.getFormularioInteraccion = () => {
    return `
        <div class="form-container">
            <h3>Agregar dialogos del presentador</h3>
            <form class="form" action="http://localhost:3035/api/interaccion/create" method="post" enctype="multipart/form-data" id="form-interaccion" >
                <div class="form-group">
                    <label for="interaccion-contexto">Contexto de la escena:</label>
                    <textarea name="interaccion-contexto" id="interaccion-contexto" cols="30" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="interaccion-idioma">Idioma: </label>
                    <input type="text" id="interaccion-idioma" name="interaccion-idioma"  value='Español' readonly required="">
                </div>
                <div class="form-group">
                    <label for="interaccion-texto">Dialogos del presentador:</label>
                    <textarea name="interaccion-texto" id="interaccion-texto" cols="30" rows="3"></textarea>
                </div>
                <div class="form-option-container">
                    <button class="form-submit-btn" type="submit" id="form-btn-interaccion-guardar">Guardar</button>
                    <button class="form-submit-btn" type="button" id="form-btn-interaccion-cancelar">Cancelar</button>
                </div>
            </form>
        </div>
    `;
}

export default FormularioInteraccion;