/** @format */

import React from "react";

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
					<>
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
						<input type="button" value="cancel" onClick={this.cancel} />
						<input type="button" value="save" onClick={this.save} />
						<input type="button" value="select" onClick={this.select} />
					</>
				) : (
					<>
						<span>{item.firstName}</span>
						<span>{item.lastName}</span>
						<span>{item.subject}</span>
						<span>{item.experience}</span>
						<span>
							<input type="button" value="Delete Professor" onClick={this.delete} />
							<input type="button" value="Edit Professor" onClick={this.edit} />
						</span>
					</>
				)}
			</div>
		);
	}
}

export default Professor;
