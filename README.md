# Simple CRUD API

To use this app you need clone the repo:

```git clone https://github.com/irina-mokh/crud-api.git```

Make sure you are using 20 LTS version of Node.js.

### ! Please, before running make sure you have ```.env``` file. Rename ```example.env``` to ```.env ```and change PORT value if you need.

You can run app in two modes:

- development: 
```npm run start:dev```

- production: 
```npm run start:prod```

To run tests: ```npm run test```

## Server has following endpoint:
```http://localhost:{PORT}/api/users```

- ```GET``` returns all users  or an empty array at first launch.

 ```http://localhost:3000/api/users/${id}``` - get user by id


- ```POST``` with body required fields create a new user

Interface for user:

	username: string;  
	age: number;  
	hobbies: Array of strings or empty array  

- ```PUT``` with body changes user with id

- ```DELETE``` delete user with id