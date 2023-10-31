class Presentador{
    constructor(
        id, presenter_id, created_at, thumbnail_url, preview_url, driver_id, image_url, gender, model_url, modified_at, owner_id
    ){
        this.id = id;
        this.presenter_id = presenter_id;
        this.created_at = created_at;
        this.thumbnail_url = thumbnail_url;
        this.preview_url = preview_url;
        this.driver_id = driver_id;
        this.image_url = image_url;
        this.gender = gender;
        this.model_url = model_url;
        this.modified_at = modified_at;
        this.owner_id = owner_id;
    }

    static getInstanceFromObject(object){
        return new Presentador(
            object.id, object.presenter_id, object.created_at, object.thumbnail_url, object.preview_url, object.driver_id, object.image_url, object.gender, object.model_url, object. modified_at, object.owner_id
        );
    }
}

export default Presentador;