/** @format */

import React from "react";

class Student extends React.Component {
	render() {
		const { item } = this.props;

		return (
			<div>
				{item.lastname} and {item.firstname} and {item.absences}
			</div>
		);
	}
}

export default Student;
