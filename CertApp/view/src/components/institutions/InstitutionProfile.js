// Institution Profile Page

import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { decode } from 'jsonwebtoken'
import certcreateIcon from "./certcreate.png"
import certviewIcon from "./certview.png"
import "./style.css"

class InstitutionProfile extends Component {
  
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      institution_name: '',
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
      institution_name: decoded.institution_name
    })
  }

  render() {

    return (
      <div className="container">
        <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
            <h1 className="text-center" id="Head">Hello <span id="span1">{this.state.first_name}</span> from <span id="span2">{this.state.institution_name}</span></h1>
            <br></br><br></br>
          </div>
          <div className="imageCreate">          
            <Link to="/instCreate" onClick={this.forceUpdate}>
              <div className="imagesCreate">
                <figure><img className="imgCreate" src = {certcreateIcon} alt="Create Icon"></img></figure>
              </div>
            </Link>
            <h3 className="textCreate"><span>Create</span></h3>
          </div>
          <div className="imageView">
            <Link to="/instView" onClick={this.forceUpdate}>
              <div className="imagesView">
                <figure><img className="imgView" src = {certviewIcon} alt="View Icon"></img></figure>
              </div>
            </Link>
            <h3 className="textView"><span>View</span></h3>
          </div> 
        </div>
      </div>
    )
  }
}

export default InstitutionProfile