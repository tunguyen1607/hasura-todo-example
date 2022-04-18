import {Connection, createConnection} from "typeorm";
export async function createDB() {
    return new Promise<Connection>(function (resolve, reject) {
        createConnection({
                "type": "postgres",
                "host": process.env.PG_HOST || 'localhost',
                "port": 5432,
                "username": process.env.PG_USERNAME || 'postgress',
                "password": process.env.PG_PASSWORD || '',
                "database": process.env.PG_DATABASE || 'postgress',
                "synchronize": false,
                "logging": true,
                "entities": [
                    // "dist/entity/**/*",
                    process.env.ENTITY_PATH || "dist/entity/**/*"
                ],
            }
        ).then(async (connection) => {
                resolve(connection);
            }).catch(function (err) {
            reject(err);
        })
    })
}

export async function closeDB(connection: Connection) {
    return await connection.close();
}
