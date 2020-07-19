import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Redirect } from 'react-router-dom';

export default class ExerciseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      description: '',
      reps: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    this.props.api.getUsers()
      .then((res) => {
        const users = res.map((user) => user.username);
        this.setState({ users, username: users[0] });
      })
      .catch((e) => this.props.showAlert(e));

    const id = this.props.match.params.id;
    if (id) {
      this.props.api.getExercise(id)
        .then((res) => {
          const { username, description, reps, date } = res;
          this.setState({
            username,
            description,
            reps,
            date: new Date(date),
          });
        })
        .catch((e) => this.props.showAlert(e));
    }
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeReps(e) {
    this.setState({ reps: e.target.value });
  }

  onChangeDate(date) {
    console.log(date);
    this.setState({ date });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, description, reps, date } = this.state;
    const exercise = { username, description, reps, date };

    const id = this.props.match.params.id;
    if (id) {
      exercise._id = id;
    }

    this.props.onSubmit(exercise)
      .then((res) => {
        this.props.showAlert(res);
      })
      .catch((e) => this.props.showAlert(e));
 }

  render() {
    const title = this.props.title;
    return (
      <div>
        <h3>{title}</h3>
        <Form onSubmit={(e) => this.onSubmit(e)}>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              required
              as="select"
              value={this.state.username}
              onChange={(e) => this.onChangeUsername(e)}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description: </Form.Label>
            <Form.Control
              required
              type="text"
              value={this.state.description}
              onChange={(e) => this.onChangeDescription(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Reps: </Form.Label>
            <Form.Control
              required
              type="text"
              value={this.state.reps}
              onChange={(e) => this.onChangeReps(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date: </Form.Label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={(date) => this.onChangeDate(date)}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
