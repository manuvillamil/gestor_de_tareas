import express from 'express';
import sequelize from './config/database.js';
import tareaRoutes from './routes/tareaRoutes.js';
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde el archivo .env


const app = express(); //inicia la aplicacion con express
app.use(express.json()); //para que pueda recibir datos en formato json

app.use('/api/tareas', tareaRoutes); //ruta para las tareas

// Conecta a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
        return sequelize.sync(); // Sincroniza los modelos con la base de datos
    })
    .then(() => {
        console.log('Modelos sincronizados con la base de datos.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);

    });

const PORT = process.env.PORT|| 3000; //puerto por defecto 3000
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

