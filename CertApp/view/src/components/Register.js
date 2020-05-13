// Register Page

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import studentIcon from "./studentsIcon.png";
import "./styles.css";

class Register extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
              <h1 className="text-center" id="Header">Welcome to the <span id="regText">Register</span> Page</h1>
              <p className="text-center">Please select either Student or Institution!</p>
          </div>
          <div className="imageStudent">
          <Link to="/studReg">
            <div className="imagesStudent">
            <figure><img className="imgStudent" src = {studentIcon} alt="Student Icon"></img></figure>
            </div>
          </Link>
            <h3 className="textStudent"><span>Student</span></h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Register