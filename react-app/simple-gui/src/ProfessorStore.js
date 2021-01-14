/** @format */

import { EventEmitter } from "fbemitter";

const SERVER = "http://localhost:8080";

class ProfessorStore {
	constructor() {
		this.data = [];
		this.emitter = new EventEmitter();
	}
	async getAll() {
		try {
			const response = await fetch(`${SERVER}/professors`);
			const data = await response.json();
			this.data = data;
			this.emitter.emit("GET_PROFESSORS_SUCCES");
		} catch (err) {
			console.warn(err);
			this.emitter.emit("GET_PROFESSORS_ERROR");
		}
	}

	async addOne(professor) {
		try {
			await fetch(`${SERVER}/professors`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(professor),
			});
			this.getAll();
		} catch (err) {
			console.warn(err);
			this.emitter.emit("ADD_PROFESSOR_ERROR");
		}
	}

	async saveOne() {}

	async deleteOne() {}
}
const store = new ProfessorStore();

export default store;
