const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/controllers');

// Mostrar todas las tareas
router.get('/tasks', getAllTasks);

// Crear una nueva tarea
router.post('/tasks', createTask);

// Mostrar una tarea por id
router.get('/tasks/:id', getTaskById);

// Actualizar una tarea por id
router.put('/tasks/:id', updateTask);

// Eliminar una tarea por id
router.delete('/tasks/:id', deleteTask);

module.exports = router;
