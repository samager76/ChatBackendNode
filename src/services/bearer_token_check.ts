import jwt from "jsonwebtoken";
import { getUserByName } from "../controllers/user_controller";

 async function check_token(bearerToken: string) {
    try {
        const token = bearerToken.replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        const user = typeof payload.sub === 'string' ? await getUserByName(payload.sub) : undefined;
        return user;
    } catch(error) {
        return undefined;
    }
};

export { check_token }