import {NextFunction, Response} from "express"
import { getRepository } from "typeorm";
import { user } from "../entity/users";

export async function verifyToken(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
        const userRepository = getRepository(user);
        if(!req.headers.authorization || !req.headers.authorization.split(" ")[1]){
            return res.status(401).json({msg: "Invalid token"});
        }
        const token = req.headers.authorization.split(" ")[1];

        if(token == 'hasura'){
            req.user = {id: 'admin'};
            req.user.role = 'admin';
            req.user.token = token;
            next();
        }else {
            const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
            if(!regexExp.test(token)){
                return res.status(401).json({msg: "Invalid token"});
            }
            let checkUser = await userRepository.findOne({ where: {id: token}});
            if (checkUser && checkUser.id) {
                req.user = checkUser;
                req.user.role = 'user';
                req.user.token = token;
                next();
            } else {
                return res.status(401).json({msg: "Invalid token"});
            }
        }
    } catch (err) {
        next(err);
    }
}
