import {Response} from "express";

export async function wh(req: any, res: Response){
    try {
        // verify token
        const isValidToken = req.user;
        if (isValidToken && isValidToken.id) {
            // TODO: add role when SSO+permission done
            const resData = {
                "X-Hasura-Role": isValidToken.role,
                "X-Hasura-User-Id": isValidToken.id+'',
                "X-Hasura-Is-Owner": "false",
            };
            console.log(resData);
            res.json(resData);
        } else await res.status(401).json({msg: "Invalid token"});
    } catch (err) {
        console.error("[webhook]", err);
        await res.status(401).json({msg: "Invalid token"});
    }
}
