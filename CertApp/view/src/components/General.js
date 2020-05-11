// General Page

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import getWeb3 from "../getWeb3";
import mainContract from "../contracts/mainContract.json";

export default class General extends Component {

  state = { web3: null, accounts: null, contract: null, records: [], search: '' };

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
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleChange(e){
    this.setState({
      search: e.target.value
    });
  }

  async loadRecords(e){
      e.preventDefault();
    const { contract } = this.state;
    const recordCount = await contract.methods.recordCount().call();
    let records = [];

    for(let i = 1; i<= recordCount; i++){
        const record = await contract.methods.records(i).call();
        if(record[3] === this.state.search)
          records.push(record);
        
    }
    this.setState({records});
    console.log(records)
  }


  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
              <h1 className="text-center" id="Header">Welcome to the <span id="pubText">Public</span> Page</h1>
              <p className="text-center">Please enter the student's account number to check the student's profile!</p>
          </div>
          <div>
          <center>
          <form onSubmit={this.loadRecords}><br></br><br></br>
              <input  className="form-SearchProfile" placeholder="Account Number" type="text" value={this.state.search} onChange={this.handleChange.bind(this)}></input><br></br>
              <input className="SearchProfileBtn" type="submit" value="Check"></input><br></br>
          </form>
          <br></br><br></br><br></br><br></br>
          <table id="tablePreview" className="table table-hover table-borderless" id="tableSearchProfileStyle">
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
