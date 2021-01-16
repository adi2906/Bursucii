/** @format */

import React from "react";

class StudentAddForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: " ",
			lastName: " ",
			absences: " ",
		};

		this.add = () => {
			this.props.onAdd({
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				absences: this.state.absences,
			});
		};

		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name]: evt.target.value,
			});
		};
	}
	render() {
		return (
			<div>
				<div>
					<label className="test" htmlFor="firstName">
						First Name
					</label>
					<input type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="lastName">Last Name</label>
					<input type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="absences">Absences</label>
					<input type="text" name="absences" id="absences" value={this.state.absences} onChange={this.handleChange} />
				</div>
				<div>
					<input type="button" value="add" onClick={this.add} />
				</div>
			</div>
		);
	}
}

export default StudentAddForm;
