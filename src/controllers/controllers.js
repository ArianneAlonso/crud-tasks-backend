import { newConnection } from "../bd/basedata.js";
import { validationResult } from "express-validator";

export const getAllTasks = async (request, response) => {
    try {
        const connection = await newConnection();
        const [results] = await connection.query("SELECT * FROM tasks");
        connection.end();
        response.status(200).json(results);
    } catch (error) {
        response.status(500).json({ error: "error al obtener las tareas." });
    }
};

export const createTask = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { title, description, isComplete } = request.body;

    try {
        const connection = await newConnection();
        const [results] = await connection.query("INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)", [title, description, isComplete]);
        connection.end();
        response.status(201).json({ id: results.insertId, title, description, isComplete });
    } catch (error) {
        response.status(500).json({ error: "error al crear la tarea." });
    }
};

export const getTaskById = async (request, response) => {
    const id = request.params.id;

    try {
        const connection = await newConnection();
        const [results] = await connection.query("SELECT * FROM tasks WHERE id = ?", [id]);
        connection.end();

        if (results.length === 0) {
            return response.status(404).json({ error: "tarea no encontrada." });
        }

        response.status(200).json(results[0]);
    } catch (error) {
        response.status(500).json({ error: "error al obtener la tarea." });
    }
};

export const updateTask = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const id = request.params.id;
    const { title, description, isComplete } = request.body;

    try {
        const connection = await newConnection();
        const [results] = await connection.query("UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?", [title, description, isComplete, id]);
        connection.end();

        response.status(200).json({ message: "tarea actualizada." });
    } catch (error) {
        response.status(500).json({ error: "error al actualizar la tarea." });
    }
};

export const deleteTask = async (request, response) => {
    const id = request.params.id;

    try {
        const connection = await newConnection();
        const [results] = await connection.query("DELETE FROM tasks WHERE id = ?", [id]);
        connection.end();

        response.status(200).json({ message: "tarea eliminada." });
    } catch (error) {
        response.status(500).json({ error: "error al eliminar la tarea." });
    }
};