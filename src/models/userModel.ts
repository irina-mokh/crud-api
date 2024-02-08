import { User } from '../types.js';

const users: Array<User> = [];

class UserModel {
	async getAll () {
		return users;
	}
	async getUser ( id: string) {
		return users.filter( user => user.id === id)[0];
	}
}

export const userDB = new UserModel();
