import express from 'express';
import fs from 'fs';
import sequelize from './config/database.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express(); //inicia la aplicacion con express
app.use(express.json()); //para que pueda recibir datos en formato json
const config = JSON.parse(fs.readFileSync('./src/config/settings.json', 'utf8')); //lee el archivo config.json y lo convierte a un objeto
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

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

const PORT = config.puerto || 3000; //puerto por defecto 3000
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

