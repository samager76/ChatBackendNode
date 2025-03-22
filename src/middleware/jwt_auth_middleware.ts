import { NextFunction, Request, Response } from "express";
import { check_token } from "../services/bearer_token_check";

function jwt_auth_http() {
    return async (req: Request, res: Response, next: NextFunction) => {
		const bearerToken = req.headers.authorization;
		const user = bearerToken ? await check_token(bearerToken) : undefined;
		if (user) {
			req.user = user;
			return next()
		}
		res.status(401).send('jwt authentication failed')
	}
};

function jwt_auth_socket() {
	return async (socket: any, next: any) => {
		const bearerToken = socket.handshake.auth.token;
		const user = bearerToken ? await check_token(bearerToken) : undefined;
		if (user) {
			socket.data.user = user;
			return next()
		}
		next(new Error('jwt authentication failed'))
	}
};

export { jwt_auth_http, jwt_auth_socket }