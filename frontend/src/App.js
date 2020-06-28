import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ExercisesList from './components/ExercisesList';
import ExerciseForm from './components/forms/ExerciseForm';
import UserForm from './components/forms/UserFrom';
import Api from './api/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.api = new Api();
    this.state = {
      showAlert: false,
      alert: { success: false, message: '' },
    };
  }

  alert() {
    if (this.state.showAlert) {
      const alert = this.state.alert;
      return (
        <Alert
          variant={alert.success ? 'success' : 'danger'}
          onClose={() => this.setState({ showAlert: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      );
    }
  }

  showAlert(alert) {
    this.setState({ alert, showAlert: true });
  }

  render() {
    return (
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Link to="/" className="navbar-brand">
            Excercise Tracker
          </Link>
          <Navbar.Toggle aria-controls="nav" />
          <Navbar.Collapse id="nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Link to="/" className="nav-link">
                  Exercises
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/create" className="nav-link">
                  Create Exercise
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/user" className="nav-link">
                  Create User
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container className="mt-4">
          {this.alert()}
          <Switch>
            <Route
              path="/"
              exact
              component={(props) => (
                <ExercisesList
                  {...props}
                  api={this.api}
                  showAlert={(alert) => this.showAlert(alert)}
                />
              )}
            />
            <Route
              path="/create"
              component={(props) => (
                <ExerciseForm
                  {...props}
                  title="Add Exercise"
                  onSubmit={(exercise) => this.api.addExercise(exercise)}
                  showAlert={(alert) => this.showAlert(alert)}
                />
              )}
            />
            <Route
              path="/edit/:id"
              component={(props) => (
                <ExerciseForm
                  {...props}
                  title="Edit Exercise"
                  onSubmit={(exercise) => this.api.editExercise(exercise)}
                  showAlert={(alert) => this.showAlert(alert)}
                />
              )}
            />
            <Route
              path="/user"
              component={(props) => (
                <UserForm
                  {...props}
                  api={this.api}
                  showAlert={(alert) => this.showAlert(alert)}
                />
              )}
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
