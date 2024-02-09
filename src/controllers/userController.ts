import { IncomingMessage, ServerResponse } from 'http';
import { RequestHandler, User, UserData } from '../types.js';
import { userDB } from '../models/userModel.js';
import { CODES } from '../consts.js';
import { getReqBody, isValidUser, sendRes } from '../helpers.js';
import { validate } from 'uuid';

class UserController  {
	getAll: RequestHandler  = async (req, res) => {
		if (req.url === '/api/users') {
			const users = await userDB.getAll();
			sendRes(res, CODES.OK, users)
		} else {
			sendRes(res, CODES.notFound, "Wrong endpoint. Check your request url");
		}
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

	create: RequestHandler = async (req, res) => {
		
		const data: UserData = await getReqBody(req);
		if (isValidUser(data)) {
			const newUser = await userDB.createUser(data);
			sendRes(res, CODES.created, newUser);
		} else {
			sendRes(res, CODES.invalid, 'Invalid user data');
		}

	}

	edit: RequestHandler = async (req, res) => {
		const id = String(req.url?.slice(11));

		if (!id || !validate(id)) {
			sendRes(res, CODES.invalid, 'User id is invalid');
		} else {
			const data: User = await getReqBody(req);
			if (isValidUser(data)) {
				if (await userDB.hasUser(id)) {
					const newUser = await userDB.editUser(data);
					sendRes(res, CODES.OK, {...newUser, id});
				} else {
					sendRes(res, CODES.notFound, 'User doesn\'t exist');
				}
			} else {
				sendRes(res, CODES.invalid, 'User data is invalid');
			}
		}
	}

	delete: RequestHandler = async (req, res) => {
		const id = String(req.url?.slice(11));

		if (!id || !validate(id)) {
			sendRes(res, CODES.invalid, 'User id is invalid');
		} else {
				if (await userDB.hasUser(id)) {
					userDB.deleteUser(id);
					sendRes(res, CODES.OK, `User with id: ${id} has been successfully deleted`);
				} else {
					sendRes(res, CODES.notFound, 'User doesn\'t exist');
				}
		}
	}
}

export const userController = new UserController();
