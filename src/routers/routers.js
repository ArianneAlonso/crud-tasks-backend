import express from 'express';
import {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/controllers.js';
import { createTaskValidation, updateTaskValidation } from '../validations/validations.js';
import { validationResult } from 'express-validator';

const router = express.Router();

router.get('/tasks', getAllTasks);

router.post('/tasks', createTaskValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, createTask);

router.get('/tasks/:id', getTaskById);

router.put('/tasks/:id', updateTaskValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, updateTask);

router.delete('/tasks/:id', deleteTask);

export default router;