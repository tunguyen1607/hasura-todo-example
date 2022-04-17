import { Router } from "express";
import {
 wh
} from "./controllers/wh/wh.controller";
import {
    todoItemEvent
} from "./controllers/events/events.controller";
import { verifyToken } from "./services/auth.service";

const router = Router();

router
  .get("/wh", verifyToken, wh)
  .post("/handle-event", todoItemEvent)

export default router;
