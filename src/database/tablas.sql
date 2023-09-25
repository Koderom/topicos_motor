DROP TABLE IF EXISTS archivos;
DROP TABLE IF EXISTS escenas;
DROP TABLE IF EXISTS guiones;

CREATE TABLE IF NOT EXISTS guiones(
    id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS escenas(
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR,
    tipo CHAR,
    guion_id INTEGER,

    FOREIGN KEY (guion_id) REFERENCES guiones(id)
);

CREATE TABLE IF NOT EXISTS archivos(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150),
    local_path VARCHAR(250),
    tipo VARCHAR(10),
    url_portada VARCHAR(250),
    duracion VARCHAR(8),
    escena_id INTEGER,

    FOREIGN KEY (escena_id) REFERENCES escenas(id)
);

insert into guiones default values returning id;
insert into escenas(descripcion, tipo, guion_id)
values 	('escena 1 descripcion', 'I' , 1),
		('escena 2 descripcion', 'A' , 1),
		('escena 3 descripcion', 'I' , 1),
		('escena 4 descripcion', 'A' , 1),
		('escena 5 descripcion', 'I' , 1)
returning id;
insert into archivos (nombre, local_path, tipo, url_portada, duracion, escena_id)
values 	('video 1', 'ruta de archivo local 1','.mp4', 'url_portada 1' , '10:30' , 1),
		('video 1', 'ruta de archivo local 1','.mp3', 'url_portada 1' , '10:30' , 2),
		('video 1', 'ruta de archivo local 1','.mp4', 'url_portada 1' , '10:30' , 3)
returning id;