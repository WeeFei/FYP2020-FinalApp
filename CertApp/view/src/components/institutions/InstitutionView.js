// View Page

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import getWeb3 from "../../getWeb3";
import mainContract from "../../contracts/mainContract.json";
import "./style.css";

export default class InstitutionView extends Component {

  state = { web3: null, 
    accounts: null, 
    contract: null, 
    records: [],
    student: '', 
    bcAccounts: [], 
    name: '' };

componentDidMount = async () => {
try {
this.loadRecords = this.loadRecords.bind(this);

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
this.setState({ web3, accounts, contract: instance }, this.renderAccounts);
} catch (error) {
// Catch any errors for any of the above operations.
alert(
`Failed to load web3, accounts, or contract. Check console for details.`,
);
console.error(error);
}
};

async renderAccounts(){
const {contract} = this.state;
  const accountCount = await contract.methods.acCount().call();
  let accounts = [];

  for(let i = 1; i<= accountCount; i++){
    const account = await contract.methods.accounts(i).call();
      accounts.push(account);
}
this.setState({bcAccounts: accounts});
}

async handleChangeStudent(e){
await this.setState({
student: e.target.value
});
const {contract} = this.state;
let name = await contract.methods.accountNoToName(this.state.student).call();
this.setState({name})
console.log(name)
}

async loadRecords(e){
e.preventDefault();
const { contract } = this.state;
const recordCount = await contract.methods.recordCount().call();
console.log(recordCount)
let records = [];

for(let i = 1; i<= recordCount; i++){
const record = await contract.methods.records(i).call();
if(record[3] === this.state.student)
  records.push(record);

}
this.setState({records});
this.setState({name: ''});
this.setState({student: ''});
console.log(records)
}

  render() {
    return (
      <div className="container">
        <div>
          <Link to="/instProfile" className="textHome">Home</Link>
        </div>
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
              <h1 className="text-center" id="Header">Welcome to <span id="viewText">Certificate View</span> Page</h1>
              <p className="text-center">This is a page for viewing student's certificate!</p>
          </div>
          <div>
          <center>
          <form onSubmit={this.loadRecords}><br></br><br></br>
          <label className="lb_SSname">{this.state.name}</label>
        <select className="form-CreateStudRec" value={this.state.student} onChange={this.handleChangeStudent.bind(this)}>
            <option value="" disabled selected hidden>Select Account Number</option>
            {this.state.bcAccounts.map((account) => <option key={account.accountNo} value={account.accountNo}>{account.accountNo}</option>)}
        </select><br></br><br></br>
        <input className="instviewProfileBtn" type="submit" value="View Profile"></input><br></br>
          </form>

          <br></br><br></br><br></br><br></br>
          <table id="tablePreview" className="table table-hover table-borderless" id="tableinstviewProfileStyle">
                <thead>
                  <tr>
                  <th style = {{width: 150, textAlign:"center"}}>Modules</th>
                  <th style = {{width: 150, textAlign:"center"}}>Grade</th>
                  </tr>
                </thead>
        {this.state.records.map((records) => (
                 <tbody key={records.code}>
                 <tr>
                 <td style = {{textAlign:"center"}}>{records.code}</td>
                 <td style = {{textAlign:"center"}}>{records.grade}</td>
              </tr>
                 </tbody>
        ))}
        </table>
          </center>
      </div>
        </div>
      </div>
    )
  }
}
