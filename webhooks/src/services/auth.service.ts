import {NextFunction, Response} from "express"
import { getRepository } from "typeorm";
import { user } from "../entity/users";

export async function verifyToken(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
        const userRepository = getRepository(user);
        const token = req.headers.authorization.split(" ")[1];

        if(token == 'hasura'){
            req.user = {id: 'admin'};
            req.user.role = 'admin';
            req.user.token = token;
            next();
        }else {
            let checkUser = await userRepository.findOne({ where: {id: token}});
            if (checkUser && checkUser.id) {
                req.user = checkUser;
                req.user.role = 'user';
                req.user.token = token;
                next();
            } else {
                throw new Error("Invalid token");
            }
        }
    } catch (err) {
        next(err);
    }
}
