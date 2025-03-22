import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ValidationError } from "sequelize";
import { register } from "../controllers/user_controller";
import { passport } from "../services/passport_configuration";
import { jwt_auth_http } from "../middleware/jwt_auth_middleware";

const user_router = express.Router();

// user_router.post('/register',
// 	async (req: Request, res: Response) => {
// 		try {
// 			await register(req.body.email, req.body.username, req.body.password);
// 			const token = jwt.sign({ sub: req.body.username }, process.env.JWT_SECRET!, {expiresIn: '1d'});
// 			res.status(201).send({ username: req.body.username, token: token })
// 		} catch (error) {
// 			error instanceof ValidationError && res.status(400).send(error.errors[0].message);
// 		}
// 	}
// );

user_router.post('/login',
	passport.authenticate('local', {
		session: false
	}),
	(req: Request, res: Response) => {
		const token = jwt.sign({ sub: req.body.username }, process.env.JWT_SECRET!, {expiresIn: '1d'});
		res.status(200).send({ username: req.body.username, token: token })
	}
);

user_router.get('/test',
	jwt_auth_http(),
	(req: Request, res: Response) => {
		res.status(200).send('jwt authentication successful')
	}
);

export { user_router }