// Student General Profile Page

import React, { Component } from 'react';
import "./styles.css";

class StudentGeneralProfile extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-10 mx-auto">
              <h1 className="text-center" id="Header">Welcome to the <span id="profileText">Student Profile</span> Page</h1>
              <p className="text-center">This page will show the student profile!</p>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentGeneralProfile

