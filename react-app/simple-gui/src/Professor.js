/** @format */

import React from "react";

class Professor extends React.Component {
	render() {
		const { item } = this.props;
		return (
			<div>
				<span>{item.firstName}</span>
				<span>{item.lastName}</span>
				<span>{item.subject}</span>
				<span>{item.experience}</span>
			</div>
		);
	}
}

export default Professor;
