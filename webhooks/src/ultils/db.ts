import {Connection, createConnection} from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
export async function createDB() {
    return new Promise<Connection>(function (resolve, reject) {
        createConnection({
                "type": "postgres",
                "host": "45.32.120.55",
                "port": 5432,
                "username": "postgres",
                "password": "Tuantu123@",
                "database": "hasura",
                "synchronize": false,
                "logging": true,
                "entities": [
                    "src/entity/**/*",
                    "dist/entity/**/*"
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
