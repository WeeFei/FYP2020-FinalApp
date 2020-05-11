// Student Profile Page

import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { decode } from 'jsonwebtoken'

class StudentProfile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Hello {this.state.first_name} {this.state.last_name}</h1>
            <br></br><br></br>
          </div>
          <table className="table col-md-3 mx-auto text-center">
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
              <tr>
                <td>{this.state.email}</td>
                <td>{this.state.first_name}</td>
                <td>{this.state.last_name}</td>
              </tr>
          </table>
        </div>
      </div>
    )
  }
}

export default StudentProfile