// Institution Login Page

import React, { Component } from 'react'
import { instLogin } from './InstitutionFunctions'
import { Link, withRouter } from 'react-router-dom';

class InstitutionLogin extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      passwordCheck: '',
      usernameError: '',
      passwordError: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      username: this.state.username,
      password: this.state.password,
      passwordCheck: this.state.passwordCheck
    }

    const isValid = this.validate()
    if (isValid)

    instLogin(user).then(res => {
      if (res) {
        this.props.history.push(`/instProfile`)
      }
    })
  }

  validate = () => {
    let usernameError="";
    let passwordError="";

    if (!this.state.username) {
      usernameError = 'Username Cannot Be Blank'
    }

    if (!this.state.password) {
      passwordError = 'Password Cannot Be Blank'
    }

    if (usernameError || passwordError) {
      this.setState({usernameError, passwordError});
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h2 mb-3" id="Header">Institution Login</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div style={{ color: "red" }}>
                {this.state.usernameError}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div style={{ color: "red" }}>
                {this.state.passwordError}
              </div>
              <div className="form-group">
                <label htmlFor="passwordCheck">Authentication Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordCheck"
                  placeholder="Enter Authentication Password"
                  value={this.state.passwordCheck}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default InstitutionLogin