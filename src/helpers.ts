import { IncomingMessage, ServerResponse } from 'http';
import { User, UserData } from './types.js';

export const sendRes = (res: ServerResponse, code: number, data: unknown) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code;
  res.end(JSON.stringify(data));
};

export const isValidUser = (data: UserData) => {
	const { username, hobbies, age} = data;
	if (username && hobbies && age) {
		if (typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies) && hobbies.every((hobby) => typeof hobby === 'string')) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

export async function getReqBody<T>(request: IncomingMessage): Promise<T> {
  return new Promise((resolve) => {
    const res: unknown[] = [];
    request.on("data", (data: UserData | User) => res.push(data));
    request.on("end", () => resolve(res.length ? JSON.parse(res.toString()) : ""));
  });
}