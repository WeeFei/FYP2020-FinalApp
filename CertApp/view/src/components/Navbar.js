// Navbar

import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import "./styles.css";

class Landing extends Component {

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {

    const loginLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" id="navHome" exact activeStyle= { {backgroundColor: 'Gray'} }>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" id="navLogin" exact activeStyle= { { backgroundColor: 'Gray' } }>
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link" id="navReg" exact activeStyle= { { backgroundColor: 'Gray' } }>
            Register
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/general" onClick={this.forceUpdate} className="nav-link" id="navPublic" exact activeStyle= { { backgroundColor: 'Gray' } }>
            General
          </NavLink>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link" id="navLogout">
            Logout
          </a>
        </li>
      </ul>
    )


    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          {localStorage.getItem('usertoken') ? userLink : loginLink}  
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)