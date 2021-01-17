/** @format */

import { EventEmitter } from "fbemitter";
//import { Json } from "sequelize/types/lib/utils";

const SERVER = "http://localhost:8080";

class StudentStore {
	constructor(professorId) {
		this.professorId = professorId;
		this.data = [];
		this.emitter = new EventEmitter();
	}

	async getAll() {
		try {
			//aici cred ca e problema pt care nu afiseaza lista de studenti.
			const response = await fetch(`${SERVER}/professors/${this.professorId}/students`); //pt a se duce pe ramura cu studenti
			const data = await response.json();
			this.data = data;
			this.emitter.emit("GET_STUDENTS_SUCCES");
		} catch (err) {
			console.warn(err);
			this.emitter.emit("GET_STUDENTS_ERROR");
		}
	}

	async addOne(student) {
		try {
			await fetch(`${SERVER}/professors/${this.professorId}/students`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(student),
			});
			this.getAll();
		} catch (err) {
			console.warn(err);
			this.emitter.emit("ADD_STUDENT_ERROR");
		}
	}

	async saveOne(id, student) {
		//come back
		try {
			await fetch(`${SERVER}/professors/${this.professorId}/students/${id}`, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(student),
			});
			this.getAll();
		} catch (err) {
			console.warn(err);
			this.emitter.emit("SAVE_STUDENT_ERROR");
		}
	}

	async deleteOne(id) {
		//bun
		//come back if err
		try {
			await fetch(`${SERVER}/professors/${this.professorId}/students/${id}`, {
				method: "delete",
			});
			this.getAll();
		} catch (err) {
			console.warn(err);
			this.emitter.emit("DELETE_STUDENT_ERROR");
		}
	}
}

export default StudentStore;
