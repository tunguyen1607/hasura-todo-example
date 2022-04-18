import express, {NextFunction, Response} from "express";
import cors from "cors";
import routes from "../routes";
const app = express();

export async function createServer() {
    app.use(express.json());
    app.use(cors());
    app.use("", routes);

    app.use(function (err: Error, req: any, res: Response, next: NextFunction) {
        console.error(err);
        res.status(400).json({error: err.message});
    });

    return app;
}
