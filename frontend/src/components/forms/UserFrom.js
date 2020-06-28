import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class UserForm extends Component {

  // TODO: Fix Warning "Can't perform a React state update on an unmounted component"

  constructor(props) {
    super(props);
    this.state = { username: '', redirect: false };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.api
      .addUser({ username: this.state.username })
      .then((res) => {
        this.setState({ redirect: true });
        this.props.showAlert(res);
      })
      .catch((e) => this.props.showAlert(e));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect exact to="/" />;
    }
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={(e) => this.onChangeUsername(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
