// Student Profile Page

import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { decode } from 'jsonwebtoken'
import { Link, withRouter } from 'react-router-dom';
import "../styles.css";
import studentViewICON from "./studentViewICON.jpg";

class StudentProfile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      accountNumberGen: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      accountNumberGen: decoded.accountNumberGen
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Hello <span id="studViewHead">{this.state.first_name} {this.state.last_name}</span></h1>
            <br></br><br></br>
          </div>
          <div className="imageStudent">
          <Link to="/studView" onClick={this.forceUpdate}>
            <div className="imagesStudent">
            <figure><img className="imgStudent" src = {studentViewICON} alt="Student View Icon"></img></figure>
            </div>
          </Link>
            <h3 className="textStudent"><span>View or Edit</span></h3>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentProfile