import { DataTypes } from "sequelize";// libreria de sequelize para trabajar con sql
import sequelize from "../config/database.js";

const Tarea = sequelize.define('Tarea',{
    titulo: {
        type: DataTypes.STRING,
        required: true
    },
    descripcion: {
        type: DataTypes.TEXT, // permite mas caracteres que STRING
    },
    prioridad: {
        type: DataTypes.ENUM('baja', 'media', 'alta'),// en sequelize se declaran asi los enums
        defaultValue: 'media' // valor por defecto
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'en progreso', 'completada'),
        defaultValue: 'pendiente'
    },
    fechaDeVencimiento: {
        type: DataTypes.DATE, // tipo de dato fecha
        allowNull: true // no puede ser nulo
    },
    fechaDeFinalizacion: {
        type: DataTypes.DATE, // tipo de dato fecha
        allowNull: true
    }
},{
    tableName: 'tareas', // nombre de la tabla en la base de datos
});

export default Tarea; //exporta el modelo de la tarea para que pueda ser utilizado en otros archivos

