import { IncomingMessage, ServerResponse } from 'http';
import { RequestHandler } from '../types.js';
import { userDB } from '../models/userModel.js';
import { CODES } from '../consts.js';
import { sendRes } from '../helpers.js';
import { validate } from 'uuid';

class UserController  {
	getAll: RequestHandler  = async (_, res) => {
		const users = await userDB.getAll();
		sendRes(res, CODES.OK, users)
	}

	getById: RequestHandler  = async (req, res) => {
		const id = String(req.url?.slice(11));
		if (!validate(id)) {
			sendRes(res, CODES.invalid, 'User id is invalid');
		} else {
			const user = await userDB.getUser(id);
			if (user) {
				sendRes(res, CODES.OK, user);
			} else {
				sendRes(res, CODES.notFound, `User with id: ${id}  not found`);

			}


		}
	}
}

export const userController = new UserController();
