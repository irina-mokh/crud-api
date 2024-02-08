import { IncomingMessage, ServerResponse } from 'http';

export interface User {
	id: string;
	username: string;
	age: number;
	hobbies: Array<string>
}



export type RequestHandler = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void;

