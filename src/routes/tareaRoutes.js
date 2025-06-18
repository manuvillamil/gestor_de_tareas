import express from 'express';
import Tarea from '../models/Tarea.js';
const router = express.Router();

router.post('/', async (req, res) => { //crea una nueva tarea
    try {
        const nuevaTarea =  await Tarea.create(req.body); // crea una nueva tarea con los datos del body
        res.status(201).json(nuevaTarea);//201 esta todo bien
    } catch (error) {
        res.status(400).json({ error: error.message });// 400 error
    }
});

router.get('/', async (req, res) => { //obtiene todas las tareas
    try {
        const tareas = await Tarea.findAll();// findAll es un metodo que obtiene todos los documentos de la coleccion
        res.status(200).json(tareas); // 200 esta todo bien. Devuelve las tareas en formato JSON
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' }); // 500 error interno del servidor. Siempre tiene q haber un JSON
        console.error(error); // imprime el error en la consola
    }
});

router.delete('/:id', async (req, res) => { //elimina una tarea por id
    try {
        const tareaEliminada = await Tarea.destroy({where:{id: req.params.id}}); // busca la tarea por id y la elimina. 
        if (tareaEliminada === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' }); // 404 no encontrado
        }
        res.status(200).json({ message: 'Tarea eliminada con éxito' }); // 200 esta todo bien
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' }); // 500 error interno del servidor
        console.error(error); // imprime el error en la consola
    }
});

router.put('/:id', async (req, res) => { //actualiza una tarea por id

    try {

        const [filasActualizadas] = await Tarea.update(req.body, {
            where: { id: req.params.id } // busca la tarea por id y la actualiza
           
        });

         if(filasActualizadas === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada o no se pudo realizar el cambio' }); // 404 no encontrado
         }



        const tareaActualizada = await Tarea.findByPk (req.params.id); // busca la tarea actualizada por el primer key (en este caso el id  )
        res.status(200).json(tareaActualizada); // 200 esta todo bien. Devuelve la tarea actualizada en formato JSON
    } catch (error) {
        res.status(400).json({ error: error.message }); // 400 error en el formato de la nueva tarea. Devuelve el error en formato JSON
        console.error(error); // imprime el error en la consola
    }
    
});

router.patch('/:id/completar', async (req, res) => { //actualiza parcialmente una tarea por id(cambia el estado a completada)
try {
    const [filasActualizadas] = await Tarea.update(
        { estado: 'completada', fechaDeFinalizacion: new Date()}, // actualiza el estado a completada. new Date() establece la fecha de finalización a la fecha actual
        { where: { id: req.params.id } } // busca la tarea por id
    );
    if (filasActualizadas === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada o ya está completada' }); // 404 no encontrado
    }
    const tareaActualizada = await Tarea.findByPk(req.params.id); 
    res.status(200).json(tareaActualizada); 
} catch (error) {
    res.status(500).json({ error: 'Error al completar la tarea' }); // 500 error interno del servidor
    console.error(error); // imprime el error en la consola
}

});
export default router;