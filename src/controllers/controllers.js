const { newConnection } = require("../bd/basedata");

// Mostrar todas las tareas
const getAllTasks = async (request, response) => {
    const connection = await newConnection();
    const [results] = await connection.query("SELECT * FROM tasks");
    response.json(results);
    connection.end();
};

// Crear una nueva tarea
const createTask = async (request, response) => {
    const connection = await newConnection();
    const { title, description, isComplete } = request.body;
    const [results] = await connection.query("INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)", [title, description, isComplete]);
    response.json({ id: results.insertId, title, description, isComplete });
    connection.end();
};

// Mostrar una tarea por id
const getTaskById = async (request, response) => {
    const connection = await newConnection();
    const id = request.params.id;
    const [results] = await connection.query("SELECT * FROM tasks WHERE id = ?", [id]);
    response.json(results[0]);
    connection.end();
};

// Actualizar una tarea por id
const updateTask = async (request, response) => {
    const connection = await newConnection();
    const id = request.params.id;
    const { title, description, isComplete } = request.body;
    const [results] = await connection.query("UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?", [title, description, isComplete, id]);
    response.json(results);
    connection.end();
};

// Eliminar una tarea por id
const deleteTask = async (request, response) => {
    const connection = await newConnection();
    const id = request.params.id;
    const [results] = await connection.query("DELETE FROM tasks WHERE id = ?", [id]);
    response.json(results);
    connection.end();
};

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};
