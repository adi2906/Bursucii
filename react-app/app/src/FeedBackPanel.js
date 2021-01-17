/** @format */

import React from "react";

class FeedBack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			smileyFaces: this.props.smileyFaces,
			frownyFace: this.props.frownyFaces,
			surprisedFace: this.props.surprisedFace,
			confusedFace: this.props.confusedFaces,
		};
	}

	componentDidUpdate() {
		this.state.smileyFaces = this.props.smileyFaces;
		this.state.frownyFace = this.props.frownyFaces;
		this.state.surprisedFace = this.props.surprisedFaces;
		this.state.confusedFace = this.props.confusedFaces;

		console.log("done update");
	}
	render() {
		return (
			<div className="card">
				<h1>Feedback Results:</h1>
				<h1>
					{String.fromCodePoint(128512)} : {this.props.smileyFaces}
				</h1>
				<h1>
					{String.fromCodePoint(128577)} : {this.props.frownyFaces}
				</h1>
				<h1>
					{String.fromCodePoint(128558)} : {this.props.surprisedFaces}
				</h1>
				<h1>
					{String.fromCodePoint(129300)} : {this.props.confusedFaces}
				</h1>
			</div>
		);
	}
}

export default FeedBack;
