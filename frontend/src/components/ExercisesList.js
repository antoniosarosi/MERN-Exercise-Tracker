import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Exercise from './Exercise';

class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.minTableWidth = 550;
    this.state = {
      exercises: [],
      displayTable: window.innerWidth >= this.minTableWidth,
    };

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const displayTable = this.state.displayTable;

      if (displayTable && width < this.minTableWidth) {
        this.setState({ displayTable: false });
      }
      if (!displayTable && width >= this.minTableWidth) {
        this.setState({ displayTable: true });
      }
    });
  }

  componentDidMount() {
    this.props.api.getAllExercises()
      .then((exercises) => this.setState({ exercises }))
      .catch((e) => this.props.showAlert(e));
  }

  deleteExercise(id) {
    this.props.api.deleteExercise(id)
      .then((res) => {
        this.props.showAlert(res);
        this.setState({
          exercises: this.state.exercises.filter((ex) => ex._id !== id),
        });
      })
      .catch((e) => this.props.showAlert(e));
  }

  createList() {
    return this.state.exercises.map((exercise) => (
      <Exercise
        key={exercise._id}
        exercise={exercise}
        minTableWidth={this.minTableWidth}
        deleteExercise={(id) => this.deleteExercise(id)}
      />
    ));
  }

  render() {
    if (this.state.displayTable) {
      return (
        <div>
          <h3>Logged Exercises</h3>
          <Table>
            <thead className="thead-dark">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Reps</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.createList()}</tbody>
          </Table>
        </div>
      );
    }
    return (
      <div>
        <h3>Logged Exercises</h3>
        {this.createList()}
      </div>
    );
  }
}

export default ExercisesList;
