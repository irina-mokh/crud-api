import { User, UserData } from '../types.js';
import { v4 as uuidv4 } from 'uuid';

let users: Array<User> = [];

class UserModel {
	async getAll () {
		return users;
	}

	async hasUser (id: string) {
		const search = users.filter(user => user.id === id)
		return (search.length > 0);
	}

	async getUser ( id: string) {
		return users.filter( user => user.id === id)[0];
	}
	
	async createUser ( data : UserData) {
		const newUser = {
			...data,
			id: uuidv4(),
		}
		users.push(newUser);
		return (newUser);
	}

	async editUser ( data : User) {
		const userIndex = users.findIndex(user => user.id === data.id);
		users[userIndex] = data;
		return (data);
	}

	async deleteUser (id: string) {
		users = users.filter(user => user.id !== id)
	}
}

export const userDB = new UserModel();
