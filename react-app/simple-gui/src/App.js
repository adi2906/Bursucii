/** @format */

import React from "react";
import Professor from "./Professor";
import store from "./ProfessorStore";
import ProfessorAddForm from "./ProfessorAddForm";
import ProfessorDetails from "./ProfessorDetails";

// const SERVER = "http://localhost:8080";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			professors: [],
			selected: 0,
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
			});
		};

		this.cancel = () => {
			this.setState({
				selected: 0,
			});
		};
	}

	componentDidMount() {
		store.getAll();
		store.emitter.addListener("GET_PROFESSORS_SUCCES", () => {
			this.setState({
				professors: store.data,
			});
		});

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
		if (this.state.selected === 0) {
			return (
				<div>
					{this.state.professors.map((e) => (
						<Professor item={e} key={e.id} onSave={this.save} onDelete={this.delete} onSelect={this.select} />
					))}
					<ProfessorAddForm onAdd={this.add} />
				</div>
			);
		} else {
			// fa ceva dupa select
			return (
				<div>
					<ProfessorDetails onCancel={this.cancel} itemId={this.state.selected} />
				</div>
			);
		}
	}
}

export default App;
