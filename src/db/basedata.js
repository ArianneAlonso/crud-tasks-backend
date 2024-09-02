import { createConnection } from "mysql2/promise";

export const newConnection = async () => {
    try {
        const connection = await createConnection({
            host: "localhost",
            user: "root",
            database: "tasks_db",
        });

        console.log("base de datos conectada")
    
        return connection;
    
    } catch (error) {
        console.log("error al conectar la base de datos")

        process.exit(1)
    }
}