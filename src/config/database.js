import {Sequelize} from 'sequelize';
const sequelize = new Sequelize(
    'gestor_tareas',
    'root',
    '8436teodoro',{
        host: 'localhost',
        dialect: 'mysql',
    });

    export default sequelize;
// Exporta la instancia de Sequelize para que pueda ser utilizada en otros archivos