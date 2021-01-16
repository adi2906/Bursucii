/** @format */

import React from "react";
import Professor from "./Professor";
import store from "./ProfessorStore";
import ProfessorAddForm from "./ProfessorAddForm";
import ProfessorDetails from "./ProfessorDetails";
import "./myStyle.css";
import ParticipateAs from "./ParticipateAs";
import Student from "./Student";
import Timer from "./Timer";

const SERVER = "http://localhost:8080";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			professors: [],
			selected: 0,
			asProfessor: 0,
			students: [],
			profSelected: 1,
			asStudent: 0,
		};

		this.add = (professor) => {
			store.addOne(professor);
		};

		this.save = (id, professor) => {
			store.saveOne(id, professor);
		};

		this.delete = (id) => {
			store.deleteOne(id);
		};

		this.select = (id) => {
			this.setState({
				selected: id,
				profSelected: id,
			});
		};

		this.cancel = () => {
			this.setState({
				selected: 0,
			});
		};

		this.btnProfessor = () => {
			this.setState({
				asProfessor: 1,
			});
			console.log(this.state.asProfessor);
		};

		this.btnStudent = () => {
			this.setState({
				asStudent: 1,
			});
			console.log(this.state.asProfessor);
		};
	}

	componentDidMount() {
		store.getAll();
		store.emitter.addListener("GET_PROFESSORS_SUCCES", () => {
			this.setState({
				professors: store.data,
			});
		});

		fetch(`${SERVER}/professors/1/students`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					students: data,
				});
			})
			.catch((err) => {
				console.warn(err);
			});
		console.log("TESTTTTTTTTTTTTTTTTTTTTT");

		// fetch(`${SERVER}/professors`)
		// 	.then((response) => {
		// 		return response.json();
		// 	})
		// 	.then((data) => {
		// 		this.setState({
		// 			professors: data,
		// 		});
		// 	})
		// 	.catch((err) => {
		// 		console.warn(err);
		// 	});
	}

	render() {
		if (this.state.asProfessor === 0 && this.state.asStudent === 0) {
			if (this.state.selected === 0) {
				return (
					<div className="flex-container">
						<div className="list-professors">
							{this.state.professors.map((e) => (
								<Professor item={e} key={e.id} onSave={this.save} onDelete={this.delete} onSelect={this.select} />
							))}
							{console.log(this.state)}
						</div>
						<div className="add-professor">
							<ProfessorAddForm onAdd={this.add} />
						</div>
						<ParticipateAs onClickProfessor={this.btnProfessor} onClickStudent={this.btnStudent} />
					</div>
				);
			} else if (this.state.selected !== 0) {
				// fa ceva dupa select
				return (
					<div>
						<h3>List of Students</h3>
						{this.state.students.map((e) => (
							<div>
								<span>{e.firstName} </span>
								<span>{e.lastName} </span>
								<span>{e.absences} </span>
							</div>
						))}
						<ProfessorDetails onCancel={this.cancel} itemId={this.state.selected} />

						{console.log("+++++++")}
						{console.log(this.state.students)}
					</div>
				);
			} else {
				return "test";
			}
		} else if (this.state.asProfessor === 1) {
			return (
				<div>
					Hello Professor!
					<Timer startCount="3600" />;
				</div>
			);
		} else if (this.state.asStudent === 1) {
			return (
				<div>
					Hello Student!
					<Timer startCount="3600" />
				</div>
			);
		} else {
			return 0;
		}
	}
}

export default App;
