// TODO: implement webhooks server
import express, {NextFunction, Response} from "express";
import cors from "cors";
import "reflect-metadata";
import routes from "./routes";
import {createConnection} from "typeorm";
import * as dotenv from "dotenv";
const app = express();
const port = 8989;
dotenv.config();

createConnection()
    .then(async (connection) => {
        app.use(express.json());
        app.use(cors());
        app.use("", routes);

        app.use(function (err: Error, req: any, res: Response, next: NextFunction) {
            console.error(err);
            res.status(400).json({error: err.message});
        });

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    })
    .catch((error) => console.log(error));
