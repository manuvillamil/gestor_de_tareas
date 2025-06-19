import Tarea from "../models/Tarea.js";
const crearTarea = (data) => Tarea.create(data);
const obtenerTareas = () => Tarea.findAll();
const obtenerTareaPorId = (id) => Tarea.findByPk(id);
const actualizarTarea = (id, data) => Tarea.update(data, { where: { id } });
const eliminarTarea = (id) => Tarea.destroy({ where: { id } });
export default {
    crearTarea,
    obtenerTareas,
    obtenerTareaPorId,
    actualizarTarea,
    eliminarTarea
};