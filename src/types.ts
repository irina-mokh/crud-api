import { IncomingMessage, ServerResponse } from 'http';

export interface UserData {
	username: string;
	age: number;
	hobbies: Array<string>
}

export interface User extends UserData{
	id: string;
}


export type RequestHandler = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void;

