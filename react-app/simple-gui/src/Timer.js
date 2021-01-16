/** @format */

import React, { Component } from "react";

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1,
		};
	}

	render() {
		//daca count == 0 atunci timeOUT message!
		const { count } = this.state;
		if (this.state.count > 0) {
			return (
				<div>
					<h1>
						Time Remaining: {Math.floor(count / 60)} minutes and {count % 60} seconds
					</h1>
				</div>
			);
		} else {
			return (
				<div>
					<h1>TIME IS UP!</h1>
				</div>
			);
		}
	}

	componentDidMount() {
		const { startCount } = this.props;
		this.setState({
			count: startCount,
		});

		this.myInterval = setInterval(() => {
			this.setState((prevState) => ({
				count: prevState.count - 1,
			}));
		}, 1000);
	}

	// pt memory leak uri
	componentWillUnmount() {
		clearInterval(this.myInterval);
	}
}

export default Timer;
