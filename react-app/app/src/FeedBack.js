/** @format */

import React from "react";

class FeedBack extends React.Component {
	constructor(props) {
		super();
		this.smileyface = () => {
			this.props.onSmileyFace();
		};
		this.frownyface = () => {
			this.props.onFrownyFace();
		};
		this.surprisedFace = () => {
			this.props.onSurprisedFace();
		};
		this.confusedFace = () => {
			this.props.onConfusedFace();
		};
	}

	render() {
		return (
			<div className="card">
				<h1>Feedback</h1>
				<input className="btn-feedback" type="button" value={String.fromCodePoint(128512)} onClick={this.smileyface} />
				<input className="btn-feedback" type="button" value={String.fromCodePoint(128577)} onClick={this.frownyface} />
				<input className="btn-feedback" type="button" value={String.fromCodePoint(128558)} onClick={this.surprisedFace} />
				<input className="btn-feedback" type="button" value={String.fromCodePoint(129300)} onClick={this.confusedFace} />
			</div>
		);
	}
}

export default FeedBack;
