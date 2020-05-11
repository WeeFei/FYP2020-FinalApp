// Landing Page / Home Page

import React, { Component } from 'react';
import GraduationIcon from "./Graduates.jpg";
import "./styles.css";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
              <h1 className="text-center" id="Header">Welcome to Certificate Verification</h1>
              <p className="text-center">Our app serves to help employers to verify the integrity of the employees certificate!</p>
          </div>
          <div>
          <img className="imgGraduation" src = {GraduationIcon} alt="Graduation Icon"></img>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
