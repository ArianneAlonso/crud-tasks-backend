const { newConnection } = require("../bd/basedata");

// Función para validar los datos de la tarea
const validateTask = (title, description, isComplete) => {
    if (typeof title !== 'string' || title.trim() === '' || title.length > 255) {
        return { isValid: false, message: "no puede estar vacio y no debe de pasar los 255 caracteres." };
    }
    if (typeof description !== 'string' || description.trim() === '') {
        return { isValid: false, message: "debe ser una cadena no vacia." };
    }
    if (typeof isComplete !== 'boolean') {
        return { isValid: false, message: "debe ser un valor booleano." };
    }
    return { isValid: true };
};

// Mostrar todas las tareas
const getAllTasks = async (request, response) => {
    try {
        const connection = await newConnection();
        const [results] = await connection.query("SELECT * FROM tasks");
        connection.end();
        response.status(200).json(results);
    } catch (error) {
        response.status(500).json({ error: "error al obtener las tareas." });
    }
};

// Crear una nueva tarea
const createTask = async (request, response) => {
    const { title, description, isComplete } = request.body;
    
    // Validar los datos de la tarea
    const validacion = validateTask(title, description, isComplete);
    if (!validacion.isValid) {
        return response.status(400).json({ error: validacion.message });
    }

    try {
        const connection = await newConnection();
        const [results] = await connection.query("INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)", [title, description, isComplete]);
        connection.end();
        response.status(201).json({ id: results.insertId, title, description, isComplete });
    } catch (error) {
        response.status(500).json({ error: "error al crear la tarea." });
    }
};

// Mostrar una tarea por id
const getTaskById = async (request, response) => {
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

// Actualizar una tarea por id
const updateTask = async (request, response) => {
    const id = request.params.id;
    const { title, description, isComplete } = request.body;

    // Validar los datos de la tarea
    const validacion = validateTask(title, description, isComplete);
    if (!validacion.isValid) {
        return response.status(400).json({ error: validacion.message });
    }

    try {
        const connection = await newConnection();
        const [results] = await connection.query("UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?", [title, description, isComplete, id]);
        connection.end();

        response.status(200).json({ message: "tarea actualizada." });
    } catch (error) {
        response.status(500).json({ error: "error al actualizar la tarea." });
    }
};

// Eliminar una tarea por id
const deleteTask = async (request, response) => {
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

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};