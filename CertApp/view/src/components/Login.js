// Login Page

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import studentIcon from "./studentsIcon.png";
import institutionIcon from "./institutionIcon.jpg";
import "./styles.css";

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
              <h1 className="text-center" id="Header">Welcome to the <span id="loginText">Login</span> Page</h1>
              <p className="text-center">Please select either Student or Institution!</p>
          </div>
          <div className="imageStudentLogin">
          <Link to="/studLogin">
            <div className="imagesStudentLogin">
            <figure><img className="imgStudentLogin" src = {studentIcon} alt="Student Icon"></img></figure>
            </div>
          </Link>
            <h3 className="textStudentLogin"><span>Student</span></h3>
          </div>
          <div className="imageInstitution">
          <Link to="/instLogin">
            <div className="imagesInstitution">
            <figure><img className="imgInstitution" src = {institutionIcon} alt="Institution Icon"></img></figure>
            </div>
          </Link>
            <h3 className="textInstitution"><span>Institution</span></h3>
          </div>  
        </div>
      </div>
    )
  }
}

export default Login