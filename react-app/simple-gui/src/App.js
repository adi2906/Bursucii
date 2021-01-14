/** @format */

import React from "react";
import Professor from "./Professor";
import store from "./ProfessorStore";
import ProfessorAddForm from "./ProfessorAddForm";

// const SERVER = "http://localhost:8080";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			professors: [],
		};
		this.add = (professor) => {
			store.addOne(professor);
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
	} //29:34

	render() {
		return (
			<div>
				{this.state.professors.map((e) => (
					<Professor item={e} key={e.id} />
				))}
				<ProfessorAddForm onAdd={this.add} />
			</div>
		);
	}
}

export default App;
