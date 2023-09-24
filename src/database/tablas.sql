CREATE TABLE IF NOT EXISTS guion(
    id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS archivo(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150),
    local_path VARCHAR(250),
    tipo CHAR
);

CREATE TABLE IF NOT EXISTS escena(
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR,
    tipo CHAR,
    archivo_id INTEGER,
    guion_id INTEGER,

    FOREIGN KEY (archivo_id) REFERENCES archivo(id),
    FOREIGN KEY (guion_id) REFERENCES guion(id)
);