export interface IUser {
	id: number,
	username: string,
	password: string,
	fullName: string,
	age: number,
	registrationDate: Date
}

export class User implements IUser {
	constructor(
		public id: number,
		public username: string,
		public password: string,
		public fullName: string,
		public age: number,
		public registrationDate: Date
	) {}
}