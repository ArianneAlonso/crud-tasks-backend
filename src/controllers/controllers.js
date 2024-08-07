const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.json());

// Mostrar todas las tareas
app.get("/tasks", async (request, response) => {
    const connection = await newConnection();
    const [results] = await connection.query("SELECT * FROM tasks");
    response.json(results);
    connection.end();
});

// Crear una nueva tarea
app.post("/tasks", async (request, response) => {
    const connection = await newConnection();
    const { title, description, isComplete } = request.body;
    const [results] = await connection.query("INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)", [title, description, isComplete]);
    response.json({ id: results.insertId, title, description, isComplete });
    connection.end();
});

// Mostrar una tarea por id
app.get("/tasks/:id", async (request, response) => {
    const connection = await newConnection();
    const id = request.params.id;
    const [results] = await connection.query("SELECT * FROM tasks WHERE id = ?", [id]);
    response.json(results[0]);
    connection.end();
});

// Actualizar una tarea por id
app.put("/tasks/:id", async (request, response) => {
    const connection = await newConnection();
    const id = request.params.id;
    const { title, description, isComplete } = request.body;
    const [results] = await connection.query("UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?", [title, description, isComplete, id]);
    response.json(results);
    connection.end();
});

// Eliminar una tarea por id
app.delete("/tasks/:id", async (request, response) => {
    const connection = await newConnection();
    const id = request.params.id;
    const [results] = await connection.query("DELETE FROM tasks WHERE id = ?", [id]);
    response.json(results);
    connection.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
