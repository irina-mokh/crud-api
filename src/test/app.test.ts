import supertest from 'supertest';
import { server } from '../index.js';
import { User, UserData } from '../types.js';
import { v4 as uuidv4 } from 'uuid';

const url = '/api/users';
const user: UserData = {
	"username": "Sheldon",
  "hobbies": ["flags", "trains"],
  "age": 27
}

const user2: UserData = {
	"username": "Leonard",
  "hobbies": ["gaming", "science"],
  "age": 27
}

const DB: User[] = [];

describe('Controller: valid operations', () => {
	let testID: string;
	let testID2: string;
	it('should return empty Users array on first launch', async () => {
		const response = await supertest(server).get(url);

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual([]);
	});

	it('should post user', async () => {
		const response = await supertest(server)
		.post(url)
		.send(user);
		
		testID = response.body.id;
		DB.push(response.body);
		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({
			...user,
			id: testID,
		});
	});

	it('should return user by ID', async () => {
		const response = await supertest(server).get(`${url}/${testID}`);
			
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(DB[0]);
	});

	it('should edit user by ID', async () => {
		const response = await supertest(server).put(`${url}/${testID}`)
		.send(user2);

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			...user2,
			id: testID
		});
	});

	it('should delete user by ID', async () => {
		const response = await supertest(server).delete(`${url}/${testID}`)
		.send(user2);

		expect(response.statusCode).toBe(200);
	});

	it('shouldn\'t return deleted user', async () => {
		const response = await supertest(server).get(`${url}/${testID}`);
			
		expect(response.statusCode).toBe(404);
	});

	it('should post user2', async () => {
		const response = await supertest(server)
		.post(url)
		.send(user2);
		
		testID2 = response.body.id;
		DB.push(response.body);
		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({
			...user2,
			id: testID2,
		});
	});

	it('should return Users array', async () => {
		const response = await supertest(server).get(url);

		expect(response.statusCode).toBe(200);
		expect(response.body.length).toEqual(1);
	});
})


describe('Controller: invalid data', () => {
	let testID: string;
	let invalidID = 'someId1';
	
	it('should post user', async () => {
		const response = await supertest(server)
		.post(url)
		.send(user);
		
		testID = response.body.id;
		DB.push(response.body);
		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({
			...user,
			id: testID,
		});
	});

	it('shouldn\'t return user by invalid ID', async () => {
		const response = await supertest(server).get(`${url}/${invalidID}`);
	
		expect(response.statusCode).toBe(400);
	});

	it('shouldn\'t edit user by invalidID', async () => {
		const response = await supertest(server).put(`${url}/${invalidID}`)
		.send(user2);

		expect(response.statusCode).toBe(400);
	});

	it('shouldn\'t edit user by invalid data', async () => {
		const response = await supertest(server).put(`${url}/${testID}`)
		.send({
			"username": "Leonard",
  		"hobbies": "dancing",
  		"age": '27'
		});

		expect(response.statusCode).toBe(400);
	});

	it('shouldn\'t delete user by invalid UUID', async () => {
		const response = await supertest(server).delete(`${url}/${invalidID}`)
		.send(user2);

		expect(response.statusCode).toBe(400);
	});
})

describe('Controller: non-existent users', () => {
	let testID: string;
	let testUUID = uuidv4();
	
	it('should post user', async () => {
		const response = await supertest(server)
		.post(url)
		.send(user);
		
		testID = response.body.id;
		DB.push(response.body);
		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({
			...user,
			id: testID,
		});
	});

	it('shouldn\'t return user by valid UUID of non-existent user', async () => {
		const response = await supertest(server).get(`${url}/${testUUID}`);
	
		expect(response.statusCode).toBe(404);
	});

	it('shouldn\'t edit user by valid UUID of non-existent user', async () => {
		const response = await supertest(server).put(`${url}/${testUUID}`)
		.send(user2);

		expect(response.statusCode).toBe(404);
	});

	it('shouldn\'t delete user by valid UUID of non-existent user', async () => {
		const response = await supertest(server).delete(`${url}/${testUUID}`)
		.send(user2);

		expect(response.statusCode).toBe(404);
	});
})