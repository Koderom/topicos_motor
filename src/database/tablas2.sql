DROP TABLE IF EXISTS interacciones;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS audios;
DROP TABLE IF EXISTS imagenes;
DROP TABLE IF EXISTS avatares;
DROP TABLE IF EXISTS escenas;
DROP TABLE IF EXISTS archivos;
DROP TABLE IF EXISTS guiones;

CREATE TABLE guiones(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150)
);

CREATE TABLE archivos(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(300),
    tipo VARCHAR(50),
    duracion VARCHAR(15),
    local_path VARCHAR(200),
    fecha_hora_creacion TIMESTAMP
);

CREATE TABLE escenas(
    id SERIAL PRIMARY KEY,
    indice INTEGER,
    contexto VARCHAR(200),
    guion_id INTEGER,
    archivo_id INTEGER,
    tipo_escena CHAR,

    FOREIGN KEY (guion_id) REFERENCES guiones(id),
    FOREIGN KEY (archivo_id) REFERENCES archivos(id)
);

CREATE TABLE avatares(
    actor_id VARCHAR(30) PRIMARY KEY,
    presenter_id VARCHAR(50),
    driver_id VARCHAR(50),
    genero CHAR,
    url_imagen VARCHAR(200)
);

CREATE TABLE imagenes(
    id INTEGER PRIMARY KEY,
    descripcion VARCHAR(300),

    FOREIGN KEY(id) REFERENCES escenas(id) ON DELETE CASCADE
);

CREATE TABLE audios(
    id INTEGER PRIMARY KEY,
    titulo VARCHAR(200),
    autor VARCHAR(150),
    genero VARCHAR(100),

    FOREIGN KEY (id) REFERENCES escenas(id) ON DELETE CASCADE
);

CREATE TABLE videos(
    id INTEGER PRIMARY KEY,
    titulo VARCHAR(200),
    autor VARCHAR(200),

    FOREIGN KEY (id) REFERENCES escenas(id) ON DELETE CASCADE
);

CREATE TABLE interacciones(
    id INTEGER PRIMARY KEY,
    idioma VARCHAR(100),
    texto TEXT,
    avatar_id VARCHAR(30),
    clip_id VARCHAR(200),

    FOREIGN KEY (id) REFERENCES escenas(id) ON DELETE CASCADE,
    FOREIGN KEY (avatar_id) REFERENCES avatares(actor_id)
);

INSERT INTO guiones(titulo) VALUES ('guion de pruebas') RETURNING id