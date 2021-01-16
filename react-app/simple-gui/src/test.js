/** @format */

import React from "react";

import "./myStyle.css";

// const SERVER = "http://localhost:8080";

class Test extends React.Component {
	constructor() {
		super();
	}

	render() {
		if (this.state.selected === 0) {
			return (
				<div className="flex-container">
					<div className="flex-element">
						{this.state.professors.map((e) => (
							<Professor item={e} key={e.id} onSave={this.save} onDelete={this.delete} onSelect={this.select} />
						))}
						<ProfessorAddForm onAdd={this.add} />
					</div>
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

export default Test;
