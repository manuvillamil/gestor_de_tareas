import tareaRepository from "../repository/tareaRepository.js";
export const crearTarea = async (data) =>  tareaRepository.crearTarea(data);
export const obtenerTareas = async () => tareaRepository.obtenerTareas();
export const obtenerTareaPorId = async (id) => tareaRepository.obtenerTareaPorId(id);
export const eliminarTarea = async (id) => tareaRepository.eliminarTarea(id);
export const actualizarTarea = async (id, data) =>{
    const actualizadas = await tareaRepository.actualizarTarea(id, data);
    if(actualizadas[0] === 0) {
        return null;
    }
    return tareaRepository.obtenerTareaPorId(id);
};
