// Institution Register Page

import React, { Component } from 'react'
import { instReg } from './InstitutionFunctions'

class InstitutionRegister extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      email: '',
      institution_name: '',
      first_nameError: '',
      last_nameError: '',
      usernameError: '',
      passwordError: '',
      emailError: '',
      institution_nameError: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      institution_name: this.state.institution_name
    }

    const isValid = this.validate()
    if (isValid)

    instReg(newUser).then(res => {
      this.props.history.push(`/instLogin`)
    })
  }

  validate = () => {
    let first_nameError="";
    let last_nameError="";
    let usernameError="";
    let passwordError="";
    let emailError="";
    let institution_nameError="";

    if (!this.state.first_name) {
      first_nameError = 'First Name Cannot Be Blank'
    }

    if (!this.state.last_name) {
      last_nameError = 'Last Name Cannot Be Blank'
    }

    if (!this.state.username) {
      usernameError = 'Username Cannot Be Blank'
    }

    if (!this.state.password) {
      passwordError = 'Password Cannot Be Blank'
    }

    if (!this.state.email.includes('@')) {
      emailError = 'Invalid Email'
    }

    if (!this.state.institution_name) {
      institution_nameError = 'Institution Name Cannot Be Blank'
    }

    if (first_nameError || last_nameError || usernameError || passwordError || emailError || institution_nameError) {
      this.setState({first_nameError, last_nameError, usernameError, passwordError, emailError, institution_nameError});
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
              <h1 className="h2 mb-3" id="Header">Institution Register</h1>
              <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div style={{ color: "red" }}>
                {this.state.first_nameError}
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter Last Name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
              <div style={{ color: "red" }}>
                {this.state.last_nameError}
              </div>
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
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div style={{ color: "red" }}>
                {this.state.emailError}
              </div>
              <div className="form-group">
                <label htmlFor="institution">Institution</label>
                <input
                  type="text"
                  className="form-control"
                  name="institution_name"
                  placeholder="Enter Institution Name"
                  value={this.state.institution_name}
                  onChange={this.onChange}
                />
              </div>
              <div style={{ color: "red" }}>
                {this.state.institution_nameError}
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default InstitutionRegister