import express from 'express';
import {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/controllers.js';
import { createTaskValidation, updateTaskValidation } from '../validations/validations.js';
import { applyValidations } from '../middlewares/applyValidations.js';

const router = express.Router();

router.get('/tasks', getAllTasks);

router.post('/tasks', createTaskValidation, applyValidations, createTask);

router.get('/tasks/:id', getTaskById);

router.put('/tasks/:id', updateTaskValidation, applyValidations, updateTask);

router.delete('/tasks/:id', deleteTask);

export default router;
