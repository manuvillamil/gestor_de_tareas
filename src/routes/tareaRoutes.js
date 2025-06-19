import express from 'express';
import * as tareaController from '../controller/tareaController.js';

const router = express.Router();
router.post('/', tareaController.crear); // Ruta para crear una nueva tarea
router.get('/', tareaController.listar); // Ruta para listar todas las tareas
router.delete('/:id', tareaController.eliminar); // Ruta para eliminar una tarea por ID
router.put('/:id', tareaController.actualizarPorId); // Ruta para actualizar una tarea por ID
router.patch('/:id/estado', tareaController.actualizarEstado); // Ruta para actualizar el estado de una tarea por ID
router.patch('/:id/fecha', tareaController.actualizarPrioridad); // Ruta para actualizar la fecha de una tarea por ID
router.get('/estadisticas', tareaController.obtenerEstadisticas); // Ruta para obtener estadísticas de las tareas
export default router; // Exporta el router para que pueda ser utilizado en app.js