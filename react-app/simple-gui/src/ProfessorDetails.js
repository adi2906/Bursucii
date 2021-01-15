/** @format */

import React from "react";

class ProfessorDetails extends React.Component {
	constructor(props) {
		super(props);

		this.cancel = () => {
			this.props.onCancel();
		};
	}

	render() {
		return (
			<div>
				<h1> details page for {this.props.itemId}</h1>
				<div>
					<input type="button" value="cancel" onClick={this.cancel} />
				</div>
			</div>
		);
	}
}
export default ProfessorDetails;
