import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import ExercisesList from './components/ExercisesList';
import ExerciseForm from './components/forms/ExerciseForm';
import UserForm from './components/forms/UserFrom';
import api from './api/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.api = api;
    this.state = {
      showAlert: false,
      alert: { success: false, message: 'alert' }
    };
  }

  showAlert(alert) {
    this.setState({ alert, showAlert: true });
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Container className="mt-4">
          <Alert
            alert={this.state.alert}
            showAlert={this.state.showAlert}
            onClose={() => this.setState({ showAlert: false })}
          />
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
              component={(props) => {
                return (
                  <ExerciseForm
                    {...props}
                    api={this.api}
                    title="Add Exercise"
                    onSubmit={(exercise) => this.api.addExercise(exercise)}
                    showAlert={(alert) => this.showAlert(alert)}
                  />
                );
              }}
            />
            <Route
              path="/edit/:id"
              component={(props) => {
                return (
                  <ExerciseForm
                    {...props}
                    api={this.api}
                    title="Edit Exercise"
                    onSubmit={(exercise) => this.api.editExercise(exercise)}
                    showAlert={(alert) => this.showAlert(alert)}
                  />
                );
              }}
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
