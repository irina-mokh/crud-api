import {  createServer } from 'http';
import { userController } from './controllers/userController.js';
import { Methods } from './consts.js';

const PORT = process.env.PORT || 4000;

const { get, post, put, del } = Methods;

const server = createServer(async (req, res) => {

	const {url, method} = req;
	
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
				// userController.getAll();
				break;
			// PUT
			case (put):
				// userController.getAll();
				break;
			// DELETE
			case (del):
				// userController.getAll();
				break;
			default:
		}	
	} else {
		res.end("HI!");
	}

})

server.listen(PORT, () => {
	console.log(`SERVER STARTED ON PORT: ${PORT}`);
});