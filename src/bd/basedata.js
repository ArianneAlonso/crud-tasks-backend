import { createConnection } from "mysql2/promise";

export const newConnection = async () => {
    const connection = await createConnection({
        host: "localhost",
        user: "root",
        database: "tasks_db",
    });

    return connection;
};