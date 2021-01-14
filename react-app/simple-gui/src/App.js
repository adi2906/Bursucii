/** @format */

import React from "react";

const SERVER = "http://localhost:8080";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			professors: [],
		};
	}

	componentDidMount() {
		fetch(`${SERVER}/professors`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					professors: data,
				});
			})
			.catch((err) => {
				console.warn(err);
			});
	} //29:34

	render() {
		return (
			<div>
				{this.state.professors.map((e) => (
					<div>{e.firstName}</div>
				))}
			</div>
		);
	}
}

export default App;
