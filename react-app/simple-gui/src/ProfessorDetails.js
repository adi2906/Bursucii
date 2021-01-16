/** @format */

import React from "react";
import StudentStore from "./StudentStore";
import Student from "./Student";
import StudentAddForm from "./StudentAddForm";

class ProfessorDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			students: [],
		};

		this.cancel = () => {
			this.props.onCancel();
		};

		this.store = new StudentStore(this.props.itemId);

		this.add = (student) => {
			this.store.addOne(student);
		};
	}

	componentDidMount() {
		this.store.getAll();
		console.log(this.store); //le primeste la data
		console.log(this.state);

		this.store.emitter.addListener("GET_STUDENT_SUCCES", () => {
			this.setState({
				students: this.store.data,
			});
		});
		console.log("====================");
		console.log(this.store.getAll);
		//console.log(this.state);
		console.log(this.store.emitter);
	}

	render() {
		return (
			<div className="professor-details">
				<h1> details page for {this.props.itemId}</h1>
				{this.store.data.length}

				{/* nu merge:() */}
				{this.state.students.map((e) => (
					<Student key={e.id} item={e} />
				))}
				<div>
					<StudentAddForm onAdd={this.add} />
				</div>
				<div>
					<input type="button" value="cancel" onClick={this.cancel} />
				</div>
			</div>
		);
	}
}

export default ProfessorDetails;
