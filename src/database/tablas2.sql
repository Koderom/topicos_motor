DROP TABLE IF EXISTS interacciones;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS audios;
DROP TABLE IF EXISTS imagenes;
DROP TABLE IF EXISTS avatares;
DROP TABLE IF EXISTS archivos;
DROP TABLE IF EXISTS escenas;
DROP TABLE IF EXISTS guiones;

CREATE TABLE guiones(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150)
);

CREATE TABLE escenas(
    id SERIAL PRIMARY KEY,
    indice INTEGER,
    contexto VARCHAR(200),
    guion_id INTEGER,
    FOREIGN KEY (guion_id) REFERENCES guiones(id)
);

CREATE TABLE archivos(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(300),
    tipo VARCHAR(50),
    duracion VARCHAR(15),
    local_path VARCHAR(200),
    fecha_hora_creacion TIMESTAMP,
    escena_id INTEGER,

    FOREIGN KEY (escena_id) REFERENCES escenas(id)
);

CREATE TABLE avatares(
    actor_id VARCHAR(30) PRIMARY KEY,
    presenter_id VARCHAR(50),
    driver_id VARCHAR(50),
    genero CHAR,
    url_imagen VARCHAR(200)
);

CREATE TABLE imagenes(
    escena_id INTEGER PRIMARY KEY,
    descripcion VARCHAR(300),

    FOREIGN KEY(escena_id) REFERENCES escenas(id)
);

CREATE TABLE audios(
    escena_id INTEGER PRIMARY KEY,
    autor VARCHAR(150),
    genero VARCHAR(100),

    FOREIGN KEY (escena_id) REFERENCES escenas(id)
);

CREATE TABLE videos(
    escena_id INTEGER PRIMARY KEY,
    titulo VARCHAR(200),
    autor VARCHAR(200),
    tipo_video VARCHAR(300),

    FOREIGN KEY (escena_id) REFERENCES escenas(id)
);

CREATE TABLE interacciones(
    escena_id INTEGER PRIMARY KEY,
    idioma VARCHAR(100),
    texto TEXT,
    avatar_id VARCHAR(30),
    FOREIGN KEY (escena_id) REFERENCES escenas(id),
    FOREIGN KEY (avatar_id) REFERENCES avatares(actor_id)
);