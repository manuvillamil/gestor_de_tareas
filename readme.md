# Gestor de Tareas

Este proyecto es una API REST desarrollada en Node.js para la gestión de tareas, utilizando una base de datos MySQL en la nube y Sequelize como ORM.

## Descripción del proyecto

La API permite crear, consultar, actualizar y eliminar tareas. Cada tarea cuenta con título, descripción, prioridad, estado, fechas y timestamps automáticos. Se utilizó MySQL como base de datos, alojada en la nube a través del servicio **Aiven** y gestionada mediante **Sequelize**.

## Rutas principales de la API

| Método | Ruta                  | Descripción                                 |
|--------|-----------------------|---------------------------------------------|
| POST   | /tareas               | Crear una nueva tarea                       |
| GET    | /tareas               | Listar todas las tareas                     |
| DELETE | /tareas/:id           | Eliminar una tarea por ID                   |
| PUT    | /tareas/:id           | Actualizar una tarea por ID                 |
| PATCH  | /tareas/:id/estado    | Actualizar el estado de una tarea por ID    |
| PATCH  | /tareas/:id/fecha     | Actualizar la fecha de una tarea por ID     |
| GET    | /tareas/estadisticas  | Obtener estadísticas de las tareas          |

## Instrucciones para levantar el entorno

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/manuvillamil/gestor_de_tareas.git
   cd gestor_de_tareas
   ```
2. Instalar dependencias principales:
   Descargar e instalar Node.js
   ```bash
   npm install express sequelize mysql2 dotenv cors
   ```
3. (Opcional) Instalar dependencias de desarrollo:
   ```bash
   npm install --save-dev nodemon biome
   ```
4. Corroborar los datos del archivo `.env` en la raíz para la conexion con la base de datos:
   ```
   DB_HOST=tu-host-de-aiven
   DB_USER=tu-usuario
   DB_PASSWORD=tu-contraseña
   DB_NAME=tu-nombre-de-db
   DB_PORT=puerto
   ```
5. Iniciar el servidor:
   ```bash
   npm start
   ```
   
## Detalles sobre la base de datos

- Se utiliza una base de datos MySQL creada en el servicio Aiven.
- El acceso y la gestión de la base de datos se realiza mediante **Sequelize**.
- Para conectarse:
  - Crear una instancia MySQL en Aiven.
  - Obtener los datos de conexión (host, usuario, contraseña, nombre y puerto).
  - Colocarlos en el archivo `.env` como se indica arriba.
- Para generar la estructura de la base de datos, Sequelize crea las tablas automáticamente según los modelos definidos en el proyecto.
- El archivo [`ddl/schema.sql`](ddl/schema.sql) contiene el script DDL para crear la tabla `tareas` usada por la aplicación.

## Notas técnicas

- El proyecto utiliza **Sequelize** como ORM para interactuar con MySQL.
- Se utiliza **Express** para la creación de la API.
- **Biome** se usa para formateo y análisis de código.
- La conexión a la base de datos se realiza mediante las variables de entorno definidas en `.env`.

## Api desplegada en render

https://gestor-de-tareas-xeye.onrender.com