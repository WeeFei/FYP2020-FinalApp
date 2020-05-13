// Student Verify Load Page

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import studentverify from "./student-verify.png";

class Register extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
              <p className="text-center">Please select the verification icon to verify your account!</p>
          </div>
          <div className="imageStudent">
          <Link to="/studVerify" onClick={this.forceUpdate}>
            <div className="imagesStudent">
            <figure><img className="imgStudent" src = {studentverify} alt="Student Icon"></img></figure>
            </div>
          </Link>
            <h3 className="textStudent"><span>Student Verify</span></h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Register