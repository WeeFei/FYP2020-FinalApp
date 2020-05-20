// Student Register Page

import React, { Component } from 'react'
import { studReg } from './StudentFunctions'
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { decode } from 'jsonwebtoken'

class StudentRegister extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      email: '',
      first_nameError: '',
      last_nameError: '',
      usernameError: '',
      passwordError: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      email: decoded.email,
    })
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
      email: this.state.email
    }
    console.log(this.state.email)

    const isValid = this.validate()
    if (isValid)

    studReg(newUser).then(res => {
      this.props.history.push(`/studVerifyLoad`)
    })
  }

  validate = () => {
    let first_nameError="";
    let last_nameError="";
    let usernameError="";
    let passwordError="";

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

    if (first_nameError || last_nameError || usernameError || passwordError) {
      this.setState({first_nameError, last_nameError, usernameError, passwordError});
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="container"><br></br>
          <div>
            <Link to="/instProfile" className="textHome">Home</Link>
          </div>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h2 mb-3" id="Header">Student Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
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
                <label htmlFor="email"></label>
                <input
                  type="hidden"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
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

export default StudentRegister