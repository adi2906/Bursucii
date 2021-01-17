/** @format */

import React from "react";
import "./myStyle.css";

class Professor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditing: false,
			firstName: this.props.item.firstName,
			lastName: this.props.item.lastName,
			subject: this.props.item.subject,
			experience: this.props.item.experience,
		};

		this.delete = (evt) => {
			this.props.onDelete(this.props.item.id);
		};

		this.edit = () => {
			this.setState({
				isEditing: true,
			});
		};

		this.cancel = () => {
			this.setState({
				isEditing: false,
			});
		};

		this.save = () => {
			this.props.onSave(this.props.item.id, {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				subject: this.state.subject,
				experience: this.state.experience,
			});
			this.setState({
				isEditing: false,
			});
		};

		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name]: evt.target.value,
			});
		};

		this.select = () => {
			this.props.onSelect(this.props.item.id);
		};
	}

	render() {
		const { item } = this.props;
		return (
			<div>
				{this.state.isEditing ? (
					<div className="professor-editing professor-list">
						<span>
							<input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
						</span>
						<span>
							<input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
						</span>
						<span>
							<input type="text" name="subject" value={this.state.subject} onChange={this.handleChange} />
						</span>
						<span>
							<input type="text" name="experience" value={this.state.experience} onChange={this.handleChange} />
						</span>
						<br />
						<input type="button" value="Cancel" onClick={this.cancel} />
						<input type="button" value="Save" onClick={this.save} />
						<input type="button" value="Select" onClick={this.select} />
					</div>
				) : (
					<div className="professor-list">
						<span>First name: {item.firstName} </span>
						<span>Last name: {item.lastName} </span>
						<span>Subject: {item.subject} </span>
						<span>Experience: {item.experience} year(s) </span>
						<br></br>
						<span>
							<input type="button" value="Delete Professor" onClick={this.delete} />
							<input type="button" value="Edit Professor" onClick={this.edit} />
						</span>
						<br />
					</div>
				)}
			</div>
		);
	}
}

export default Professor;
