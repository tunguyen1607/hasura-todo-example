import {Response} from "express";
import { audit } from "../../entity/audit";
import {getRepository} from "typeorm";
import { v4 as uuidv4 } from "uuid";

export async function todoItemEvent(req: any, res: Response){
    try {
        // verify token
        console.log(req.body);
        const auditRepository = getRepository(audit);
        let body = req.body;
        if(!body || !body.event || !body?.event?.session_variables){
            throw new Error('not found payload')
        }
        const logAudit = {
            id: uuidv4(),
            description: JSON.stringify({
                user_id: body?.event?.session_variables['x-hasura-user-id'],
                data: body?.event?.data,
                created_at: body?.created_at,
                op: body?.event?.op,
            })
        };
        await auditRepository.save(logAudit);
        res.json(req.body);
    } catch (err) {
        console.error("[events]", err);
        await res.status(401).json({msg: "Invalid token"});
    }
}
