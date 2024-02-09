import {  createServer } from 'http';
import { userController } from './controllers/userController.js';
import { CODES, Methods } from './consts.js';
import { sendRes } from './helpers.js';

const PORT = process.env.PORT || 4000;

const { get, post, put, del } = Methods;

export const server = createServer(async (req, res) => {

	const {url, method} = req;
	
	process.on('uncaughtException', function(err) {
		res.statusCode = CODES.serverError;
		res.end(`Some server error: ${err.message}`);
	});

	try {
		if(url?.startsWith('/api/users')) {
			switch (method) {
				// GET
				case (get):
					if (url.length > 11) {
						userController.getById(req, res);
					} else {
						userController.getAll(req, res);
					}
					break;
				// POST
				case (post):
					userController.create(req, res);
					break;
				// PUT
				case (put):
					userController.edit(req, res);
					break;
				// DELETE
				case (del):
					userController.delete(req, res);
					break;
				default:
			}	
		} else {
			sendRes(res, CODES.notFound, "Wrong endpoint. Check your request url");
		}
	} catch (err) {
		if (err instanceof Error) {
			res.statusCode = CODES.serverError;
			res.end(`Some server error: ${err.message}`);
		}
	}

})

server.listen(PORT, () => {
	console.log(`SERVER STARTED ON PORT: ${PORT}`);
});