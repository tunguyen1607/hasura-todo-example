// TODO: implement webhooks server
import "reflect-metadata";
import {createDB} from "./ultils/db";
import {createServer} from "./ultils/server";
import * as dotenv from "dotenv";

const port = 8989;
dotenv.config();

createDB().then(async () => {
    let app = await createServer();
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}).catch((error) => console.log(error));
