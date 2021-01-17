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
import DrawingTable from "./DrawingTable";
import FeedBack from "./FeedBack";
import FeedBackPanel from "./FeedBackPanel";

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
			smileyFace: 0,
			frownyFace: 0,
			surprisedFace: 0,
			confusedFace: 0,
			showControls: 0,
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

		this.btnSmileyFace = () => {
			let contor = this.state.smileyFace + 1;
			this.setState({
				smileyFace: contor,
			});
			console.log(this.state.smileyFace);
		};

		this.btnFrownyFace = () => {
			let contor = this.state.frownyFace + 1;
			this.setState({
				frownyFace: contor,
			});
			console.log(this.state.frownyFace);
		};
		this.btnSurprisedFace = () => {
			let contor = this.state.surprisedFace + 1;
			this.setState({
				surprisedFace: contor,
			});
			console.log(this.state.surprisedFace);
		};
		this.btnConfusedFace = () => {
			let contor = this.state.confusedFace + 1;
			this.setState({
				confusedFace: contor,
			});
			console.log(this.state.confusedFace);
		};

		this.showControls = () => {
			if (this.state.showControls === 0) {
				this.setState({
					showControls: 1,
				});
			} else {
				this.setState({
					showControls: 0,
				});
			}
			console.log(this.state.showControls);
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
				if (this.state.showControls === 0) {
					return (
						<div className="flex-container">
							<div className="cardV2">
								<input type="button" onClick={this.showControls} value="Manage Professors and Students"></input>
							</div>
							<ParticipateAs onClickProfessor={this.btnProfessor} onClickStudent={this.btnStudent} />
						</div>
					);
				} else {
					return (
						<div className="flex-container">
							<div className="cardV2">
								<input type="button" onClick={this.showControls} value="Hide controls"></input>
							</div>

							<div className="list-professors">
								{this.state.professors.map((e) => (
									<Professor item={e} key={e.id} onSave={this.save} onDelete={this.delete} onSelect={this.select} />
								))}
							</div>
							<div className="add-professor">
								<ProfessorAddForm onAdd={this.add} />
							</div>
							<ParticipateAs onClickProfessor={this.btnProfessor} onClickStudent={this.btnStudent} />
						</div>
					);
				}
			} else if (this.state.selected !== 0) {
				// dupa select prof
				return (
					<div>
						<ProfessorDetails onCancel={this.cancel} itemId={this.state.selected} />
					</div>
				);
			} else {
				return "er";
			}
		} else if (this.state.asProfessor === 1) {
			/*PROFESOR */
			return (
				<div className="professor-view">
					<div className="view-timer">
						<Timer startCount="3600" />
					</div>
					<div>
						<h1>List of Students:</h1>
						{this.state.students.map((e, index) => (
							<div className="card">
								<h3>
									Student <span>{index + 1}</span>
								</h3>
								<div>First Name: {e.firstName} </div>
								<div>Last Name: {e.lastName} </div>
								<div>Absences: {e.absences} </div>
							</div>
						))}
					</div>

					<div>
						<h1>Drawing Board</h1>
						<DrawingTable />
					</div>
					<div>
						<FeedBackPanel
							smileyFaces={this.state.smileyFace}
							frownyFaces={this.state.frownyFace}
							surprisedFaces={this.state.surprisedFace}
							confusedFaces={this.state.confusedFace}
						/>
					</div>
				</div>
			);
		} else if (this.state.asStudent === 1) {
			/*STUDENT */
			return (
				<div className="professor-view">
					<div className="view-timer">
						<Timer startCount="3600" />
					</div>
					<div>
						<h1>List of Students:</h1>
						{this.state.students.map((e, index) => (
							<div className="card">
								<h3>
									Student <span>{index + 1}</span>
								</h3>
								<div>First Name: {e.firstName} </div>
								<div>Last Name: {e.lastName} </div>
								<div>Absences: {e.absences} </div>
							</div>
						))}
					</div>

					<div>
						<h1>Drawing Board</h1>
						<DrawingTable />
					</div>

					<div>
						<FeedBack onSmileyFace={this.btnSmileyFace} onFrownyFace={this.btnFrownyFace} onSurprisedFace={this.btnSurprisedFace} onConfusedFace={this.btnConfusedFace} />
						<FeedBackPanel
							smileyFaces={this.state.smileyFace}
							frownyFaces={this.state.frownyFace}
							surprisedFaces={this.state.surprisedFace}
							confusedFaces={this.state.confusedFace}
						/>
					</div>
				</div>
			);
		} else {
			return 0;
		}
	}
}

// TODO: un input pt numele orei

export default App;
