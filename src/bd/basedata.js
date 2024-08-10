import {newConnection} from "mysql2"

export const newConnection = async () => {
    const connection = await createConnection({
        host: "localhost",
        user: "root",
        database: "tasks_db",
    });

    return connection;
}