export enum Methods {
	get = 'GET',
	post = 'POST',
	put = "PUT",
	del = "DELETE"
}

export const enum CODES {
  OK = 200,
  created = 201,
  deleted = 204,
  invalid = 400,
  notFound = 404,
  serverError = 500,
}
export const user1 = {
	"username": "User1",
  "hobbies": ["camping", "guitar"],
  "age": 25
}