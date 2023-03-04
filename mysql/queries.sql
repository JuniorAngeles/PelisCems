-- Crear la base de datos
create database if not exists pelis_online_db;

-- Usar la base de datos
use pelis_online_db;

-- Crear la tabla
create table peliculas (
  id int auto_increment primary key,
  titulo varchar(255) not null,
  descripcionBusqueda varchar(255) not null,
  imagenUrl text not null,
  descargarUrl text not null
) engine = InnoDB;

-- Hacer una consulta para obtener todos los peliculas
-- Deberia decir que hay 0 peliculas ya que no se han agregado
select * from peliculas;

-- Este codigo es para en caso de que no se quiera conectar a la base de datos
-- Con esto le damos los permisos a la base de datos
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Junior@123';

-------- -------- -------- --------
-- HAY QUE TENER CUIDADO CON ESTO
-- YA QUE SON PARA BORRAR LOS DATOS
-------- -------- -------- --------

-- Borrar una solo pelicula por id
delete from peliculas where id = 12;

-- Borrar todos los datos de las tabla peliculas
truncate table peliculas;

-- Borrar la base de datos COMPLETA
drop database pelis_online_db;
