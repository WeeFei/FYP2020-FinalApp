import React, { Component } from 'react';
import getWeb3 from "../../getWeb3";
import mainContract from "../../contracts/mainContract.json";
import { Link, withRouter } from 'react-router-dom';
import "./style.css";

class InstitutionCreateStudentRecord extends Component {

  state = { web3: null, accounts: null, contract: null, modules: [], records: [], grades: ["A", "B", "C", "D", "F"], code: '', student: '', grade: ''};

  componentDidMount = async () => {
    try {
      this.handleSubmit = this.handleSubmit.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = mainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        mainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.renderRecords);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async renderModules(){
    const { contract } = this.state;
    const moduleCount = await contract.methods.moduleCount().call();
    let modules = [{code: 0, description: 'Select Module'}];

    for(let i = 1; i<= moduleCount; i++){
        const module = await contract.methods.modules(i).call();
        if(!module[5])
          modules.push(module);
        
    }
    this.setState({modules: modules});
    this.setState({code: modules[0].code});
    console.log(modules);
  }

  async renderRecords(){
    this.renderModules();
    const { contract } = this.state;
    const recordCount = await contract.methods.recordCount().call();
    let records = [];

    for(let i = 1; i<= recordCount; i++){
        const record = await contract.methods.records(i).call();
          records.push(record);
        
    }
    this.setState({records});
    console.log(records);
  }

  handleChangeModule(e) {
    this.setState({
      code: e.target.value
    });
    console.log(this.state.code)
  }

  handleChangeStudent(e){
    this.setState({
      student: e.target.value
    });
    console.log(this.state.student)
  }

  handleChangeGrade(e){
    this.setState({
      grade: e.target.value
    });
    console.log(this.state.grade);
  }

  async handleSubmit(e){
    e.preventDefault();

    if(this.state.code !== '' && this.state.student !== '' && this.state.grade !== ''){
      console.log('ran');
      const {contract, accounts} = this.state;
      await contract.methods.createRecord(this.state.code, this.state.grade, this.state.student).send({from: accounts[0]});
      this.renderRecords();
      this.setState({student: ''});
      this.setState({code: ''});
      this.setState({grade: ''});
    }
  }

  render() {
    return (
      <div className="container">
      <div>
        <Link to="/instProfile" className="textHome">Home</Link>
      </div>
      <div className="jumbotron mt-5">
        <div className="col-sm-10 mx-auto">
            <h1 className="text-center" id="Header">Welcome to <span className="textStudRecHeader">Create Student Record</span> Page</h1>
            <p className="text-center">This is a page for creating student's records!</p>
        </div>
      <div>
        <center>
        <form onSubmit={this.handleSubmit}>
        <input className="form-CreateStudRec" placeholder="Student Account Number" type="text" value={this.state.student} onChange={this.handleChangeStudent.bind(this)}></input><br></br>

        <select id="mod" className="form-CreateStudRec" value={this.state.code} onChange={this.handleChangeModule.bind(this)}>
          {this.state.modules.map((module) => <option key={module.code} value={module.code}>{module.description}</option>)}
        </select><br></br>

        <select className="form-CreateStudRec" value={this.state.grade} onChange={this.handleChangeGrade.bind(this)}>
          <option value="" disabled selected hidden>Select Grade</option>
          {this.state.grades.map((grade) => <option>{grade}</option>)}
        </select><br></br>

        <input className="createStudRecBtn" type="submit" value="Add Record"></input>
        </form>
        <br></br><br></br><br></br><br></br>
        <div ><center><h1 className="text-center" id="Header"><span className="textStudRecHeader">Student Record List</span></h1></center>
        <div class='table-responsive'><br></br>
        <table id="tablePreview" className="table table-hover table-borderless" id="tableStudRecStyle">
                <thead>
                  <tr>
                  <th style = {{width: 120, textAlign:"center"}}>Student</th>
                  <th style = {{width: 240, textAlign:"center"}}>Module Code</th>
                  <th style = {{width: 120, textAlign:"center"}}>Grade</th>
                  </tr>
                </thead>
        {this.state.records.map((records) => (
                 <tbody key={records.code}>
                 <tr>
                 <td style = {{textAlign:"center"}}>{records.student}</td>
                 <td style = {{textAlign:"center"}}>{records.code}</td>
                 <td style = {{textAlign:"center"}}>{records.grade}</td>
              </tr>
                 </tbody>
        ))}
        </table>
        </div>
        </div>
        </center>
      </div>
    </div>
  </div>
    );
  }
}

export default InstitutionCreateStudentRecord