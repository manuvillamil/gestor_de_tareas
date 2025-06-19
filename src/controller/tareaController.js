import * as tareaService from '../service/tareaService.js';

export const crear = async(req, res) => { //crea una nueva tarea
    try {
        const nuevaTarea =  await Tarea.create(req.body); // crea una nueva tarea con los datos del body
        res.status(201).json(nuevaTarea);//201 esta todo bien
    } catch (error) {
        res.status(400).json({ error: error.message });// 400 error
    }
};

export const listar = async(req, res) => { //obtiene todas las tareas
    try {
        const tareas = await Tarea.findAll();// findAll es un metodo que obtiene todos los documentos de la coleccion
        res.status(200).json(tareas); // 200 esta todo bien. Devuelve las tareas en formato JSON
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' }); // 500 error interno del servidor. Siempre tiene q haber un JSON
        console.error(error); // imprime el error en la consola
    }
};
    export const eliminar = async(req, res) => {//elimina una tarea por id
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
};
        
export const actualizarPorId = async(req, res) => { //actualiza una tarea por id
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
    
};

export const actualizarEstado = async(req, res) => { //actualiza parcialmente una tarea por id(cambia el estado a completada)
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

};

export const actualizarPrioridad = async(req, res) => { //obtiene una tarea por id
    const newPrioridad = req.body.prioridad; // obtiene la nueva prioridad del body de la solicitud
const prioridadesValidas = ['baja', 'media', 'alta']; // define las prioridades válidas
if( !prioridadesValidas.includes(newPrioridad)) { // verifica si la nueva prioridad es válida
    return res.status(400).json({ error: 'Prioridad no válida' }); // 400 error de solicitud incorrecta
}
try {
    const [filasActualizadas] = await Tarea.update(
        { prioridad: newPrioridad }, // actualiza la prioridad de la tarea
        { where: { id: req.params.id } } // busca la tarea por id
    );
    if (filasActualizadas === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada' }); // 404 no encontrado
    }
    const tareaActualizada = await Tarea.findByPk(req.params.id); 
    res.status(200).json(tareaActualizada);
} catch (error) {
    res.status(500).json({ error: 'Error al actualizar la prioridad de la tarea' }); 
    console.error(error);
}
};


export const obtenerEstadisticas = async(req, res) => { //obtiene las estadisticas de las tareas 
    try {
    const totalTareas = await Tarea.count(); // cuenta el total de tareas registradas
    const tareasPorEstado = await Tarea.findAll({
        attributes: ['estado', [sequelize.fn('COUNT', sequelize.col('estado')), 'cantidad']], // . fn es por funcion -- cuenta las tareas por estado
        group: ['estado'] // agrupa las tareas por estado
    });
    const tareasPorPrioridad = await Tarea.findAll({
        attributes: ['prioridad', [sequelize.fn('COUNT', sequelize.col('prioridad')), 'cantidad']], // cuenta las tareas por prioridad
        group: ['prioridad'] // agrupa las tareas por prioridad
    });
    const tareasCompletadas = await Tarea.findAll({ where: { estado: 'completada' }, attributes:['fechaDeVencimiento', 'fechaDeFinalizacion']}); // cuenta las tareas completadas
    let totalDeDias = 0; 
    let cantCompletadas = tareasCompletadas.length; 
    tareasCompletadas.forEach(tarea => {
        if(tarea.fechaDeVencimiento && tarea.fechaDeFinalizacion) {
            const msDiff = new Date(tarea.fechaDeFinalizacion) - new Date(tarea.fechaDeVencimiento); // calcula la diferencia en milisegundos
            const dias = msDiff / (1000 * 60 * 60 * 24); // convierte la diferencia a días
            totalDeDias += dias; // suma la diferencia al total de días
        }
    });
    const promedioDuracion = cantCompletadas > 0 ? totalDeDias / cantCompletadas : 0; // calcula el promedio de días de finalización
    res.status(200).json({
        totalTareas,
        tareasPorEstado,
        tareasPorPrioridad,
        promedioDiasParaCompletar: promedioDuracion.toFixed(2), // devuelve el promedio de días para completar las tareas
    }); // devuelve las estadísticas en formato JSON
} catch (error) {
    res.status(500).json({ error: 'Error al obtener las estadísticas' }); 
    console.error(error); 
    
}};
