import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        ssl: {
            require: true, // Requiere SSL
            rejectUnauthorized: false // No rechaza certificados no autorizados
        }},
    port: process.env.DB_PORT,
});
//trabajar con un archivo .env
//dotenv
//usar un docker container
export default sequelize;
// Exporta la instancia de Sequelize para que pueda ser utilizada en otros archivos