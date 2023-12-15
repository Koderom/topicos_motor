DROP TABLE IF EXISTS interacciones;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS audios;
DROP TABLE IF EXISTS imagenes;
DROP TABLE IF EXISTS avatares;
DROP TABLE IF EXISTS escenas;
DROP TABLE IF EXISTS archivos;
DROP TABLE IF EXISTS guiones;
DROP TABLE IF EXISTS programaciones;
DROP TABLE IF EXISTS programas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS configuracion_presentadores;
DROP TABLE IF EXISTS presentadores;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL
);

CREATE TABLE presentadores(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150),
    genero VARCHAR(50),
    lenguaje VARCHAR(150),
    presentador_url VARCHAR(255),
    voz_provider_id VARCHAR(255)
);

CREATE TABLE programas(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150),
    portada VARCHAR(250),
    descripcion VARCHAR(250),
    genero VARCHAR(150),
    clasificacion VARCHAR(250),
    fecha_inicio DATE,
    estado VARCHAR(50),
    horario_emision TIME,
    duracion INTEGER,
    presentador_id INTEGER,

    FOREIGN KEY (presentador_id) REFERENCES presentadores(id)
);

CREATE TABLE programaciones(
    id SERIAL PRIMARY KEY,
    nro_episodio INTEGER,
    titulo VARCHAR(150),
    descripcion VARCHAR(250),
    fecha_emision DATE,
    programa_id INTEGER,
    reproduciendo INTEGER,
    FOREIGN KEY (programa_id) REFERENCES programas(id)
);

CREATE TABLE guiones(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150),
    programacion_id INTEGER,

    FOREIGN KEY (programacion_id) REFERENCES programaciones(id)
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


CREATE TABLE imagenes(
    id INTEGER PRIMARY KEY,
    duracion INTEGER NOT NULL,
    descripcion VARCHAR(300),

    FOREIGN KEY(id) REFERENCES escenas(id) ON DELETE CASCADE
);

CREATE TABLE audios(
    id INTEGER PRIMARY KEY,
    titulo VARCHAR(200),
    autor VARCHAR(150),
    genero VARCHAR(100),
    portada VARCHAR(150),

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
    texto TEXT,
    clip_id VARCHAR(200),

    FOREIGN KEY (id) REFERENCES escenas(id) ON DELETE CASCADE
);

INSERT INTO usuarios(name, password) VALUES ('admin', '123456789');

INSERT INTO presentadores(nombre, genero, lenguaje, presentador_url, voz_provider_id)
    VALUES 
        ('prentador 1', 'male','Spanish (Spain)','https://cgfaces.com/collection/preview/0f3e1b79-d4f5-4d1f-81ce-a70fb0cef7a2.jpg','es-ES-DarioNeural'),
        ('prentador 2', 'female','Spanish (Arg)','https://img.freepik.com/fotos-premium/mujer-encuentra-oficina-brazos-cruzados_57490-363.jpg?size=626&ext=jpg','es-AR-ElenaNeural')
