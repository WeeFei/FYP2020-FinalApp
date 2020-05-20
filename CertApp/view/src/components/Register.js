// Register Page

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import studentIcon from "./studentsIcon.png";
import InstitutionIcon from "./institutionIcon.jpg";
import "./styles.css";

class Register extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
              <h1 className="text-center" id="Header">Welcome to the <span id="regText">Register</span> Page</h1>
              <p className="text-center">Please select Institution!</p>
          </div>
          <div className="imageInstitution">
          <Link to="/instReg">
            <div className="imagesInstitution">
            <figure><img className="imgInstitution" src = {InstitutionIcon} alt="Institution Icon"></img></figure>
            </div>
          </Link>
            <h3 className="textInstitution"><span>Institution</span></h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Register