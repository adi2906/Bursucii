/** @format */

import React from "react";

class Student extends React.Component {
	render() {
		const { item } = this.props;

		this.state = {
			firstName: this.props.item.firstName,
			lastName: this.props.item.lastName,
		};

		return (
			<div>
				{item.lastname} and {item.firstname} and {item.absences}
			</div>
		);
	}
}

export default Student;
