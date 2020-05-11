import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './components/Landing'
import Login from './components/Login'
import Navbar from './components/Navbar'
import General from './components/General'
import Register from './components/Register'
import StudentGeneralProfile from './components/StudentGeneralProfile'
import StudentRegister from './components/students/StudentRegister'
import StudentLogin from './components/students/StudentLogin'
import StudentProfile from './components/students/StudentProfile'
import InstitutionRegister from './components/institutions/InstitutionRegister'
import InstitutionLogin from './components/institutions/InstitutionLogin'
import InstitutionProfile from './components/institutions/InstitutionProfile'
import InstitutionCreate from './components/institutions/InstitutionCreate'
import InstitutionView from './components/institutions/InstitutionView'
import InstitutionCreateModuleList from './components/institutions/InstitutionCreateModuleList'
import InstitutionCreateStudentRecord from './components/institutions/InstitutionCreateStudentRecord'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/general" component={General} />
            <Route exact path="/studentsProfile" component={StudentGeneralProfile} />
            <Route exact path="/studReg" component={StudentRegister} />
            <Route exact path="/studLogin" component={StudentLogin} />
            <Route exact path="/studProfile" component={StudentProfile} />
            <Route exact path="/instReg" component={InstitutionRegister} />
            <Route exact path="/instLogin" component={InstitutionLogin} />
            <Route exact path="/instProfile" component={InstitutionProfile} />
            <Route exact path="/instCreate" component={InstitutionCreate} />
            <Route exact path="/instView" component={InstitutionView} />
            <Route exact path="/instCreateModList" component={InstitutionCreateModuleList} />
            <Route exact path="/instCreateStudRec" component={InstitutionCreateStudentRecord} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App