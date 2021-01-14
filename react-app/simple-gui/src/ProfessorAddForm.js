/** @format */

import React from "react";
import "./myStyle.css";

class ProfessorAddForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: " ",
			lastName: " ",
			subject: " ",
			experience: " ",
		};

		this.add = () => {
			this.props.onAdd({
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				subject: this.state.subject,
				experience: this.state.experience,
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
					<label htmlFor="subject">Subject</label>
					<input type="text" name="subject" id="subject" value={this.state.subject} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="experience">Experience</label>
					<input type="text" name="experience" id="experience" value={this.state.experience} onChange={this.handleChange} />
				</div>
				<div>
					<input type="button" value="add" onClick={this.add} />
				</div>
			</div>
		);
	}
}

export default ProfessorAddForm;
