// Institution Create Page

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moduleListIcon from "./moduleListIcon.png";
import studentRecordIcon from "./studentRecordIcon.png";
import "./style.css";
import "../styles.css";

class InstitutionCreate extends Component {
  render() {

    return (
      <div className="container">
        <div>
          <Link to="/instProfile" className="textHome">Home</Link>
        </div>
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
              <h1 className="text-center" id="Header">Welcome to the <span id="createText">Create</span> Page</h1>
              <p className="text-center">Please select either Module List or Student Record!</p>
          </div>
          <div className="imageCreateMod">
          <Link to="/instCreateModList" onClick={this.forceUpdate}>
            <div className="imagesCreateMod">
            <figure><img className="imgCreateMod" src = {moduleListIcon} alt="Module List Icon"></img></figure>
            </div>
          </Link>
            <h3 className="textCreateMod"><span>Module List</span></h3>
          </div>
          <div className="imageCreateStudRec">
          <Link to="/instCreateStudRec" onClick={this.forceUpdate}>
            <div className="imagesCreateStudRec">
            <figure><img className="imgCreateStudRec" src = {studentRecordIcon} alt="Student Record Icon"></img></figure>
            </div>
          </Link>
            <h3 className="textCreateStudRec"><span>Student Record</span></h3>
          </div>  
        </div>
      </div>
    )
  }
}

export default InstitutionCreate