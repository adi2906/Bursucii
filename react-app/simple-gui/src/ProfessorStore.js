/** @format */

import { EventEmitter } from "fbemitter";
//import { Json } from "sequelize/types/lib/utils";

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

	async saveOne(id, professor) {
		//come back
		try {
			await fetch(`${SERVER}/professors/${id}`, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(professor),
			});
			this.getAll();
		} catch (err) {
			console.warn(err);
			this.emitter.emit("SAVE_PROFESSOR_ERROR");
		}
	}

	async deleteOne(id) {
		//come back if err
		try {
			await fetch(`${SERVER}/professors/${id}`, {
				method: "delete",
			});
			this.getAll();
		} catch (err) {
			console.warn(err);
			this.emitter.emit("DELETE_PROFESSOR_ERROR");
		}
	}
}
const store = new ProfessorStore();

export default store;
