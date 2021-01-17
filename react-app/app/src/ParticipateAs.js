/** @format */

import React from "react";

class ParticipateAs extends React.Component {
	constructor() {
		super();

		this.professor = () => {
			this.props.onClickProfessor({
				asProfessor: 1,
			});
		};

		this.student = () => {
			this.props.onClickStudent({
				asStudent: 1,
			});
		};
	}
	render() {
		return (
			<div className="participate-as">
				<h1>Participate:</h1>
				<input type="button" value="as a Professor" onClick={this.professor} />
				<input type="button" value="as a Student" onClick={this.student} />
			</div>
		);
	}
}

export default ParticipateAs;
