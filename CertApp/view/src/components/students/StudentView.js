import React, { Component } from 'react';
import getWeb3 from "../../getWeb3";
import mainContract from "../../contracts/mainContract.json";
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { decode } from 'jsonwebtoken';

export default class StudentView extends Component {

  state = { web3: null, accounts: null, contract: null, records: [], accountNumberGen: ''};

  componentDidMount = async () => {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    try {
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
      this.setState({ web3, accounts, contract: instance, accountNumberGen: decoded.accountNumberGen }, this.renderRecords);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async renderRecords(){
    const { contract } = this.state;
    const recordCount = await contract.methods.recordCount().call();
    let records = [];

    for(let i = 1; i<= recordCount; i++){
        const record = await contract.methods.records(i).call();
        if (record[3] === this.state.accountNumberGen)
          records.push(record);
        
    }
    this.setState({records});
    console.log(records);
  }

  async hideRecord(e){
    console.log(e.target.value);
    const {contract, accounts} = this.state;
    await contract.methods.hideRecord(e.target.value).send({from: accounts[0]});
    this.renderRecords();
  }

  render() {
    return (
      <div className="container">
        <div><br></br>
            <Link to="/studProfile" className="textHome">Home</Link>
        </div>
        <center>
        <br></br><br></br><br></br><br></br><br></br>
        <h1 className="text-center" id="Header"><span className="textStudViewHeader">Record List</span></h1><br></br><br></br>
        <table id="tablePreview" className="table table-hover table-borderless" id="tableStudViewStyle">
                <thead>
                  <tr>
                  <th style = {{width: 120, textAlign:"center"}}>Student</th>
                  <th style = {{width: 120, textAlign:"center"}}>Module Code</th>
                  <th style = {{width: 120, textAlign:"center"}}>Grade</th>
                  <th style = {{width: 120, textAlign:"center"}}>Hidden</th>
                  </tr>
                </thead>
        {this.state.records.map((records) => (
                 <tbody key={records.code}>
                <tr>
                    <td style = {{textAlign:"center"}}>{records.student}</td>
                    <td style = {{textAlign:"center"}}>{records.code}</td>
                    <td style = {{textAlign:"center"}}>{records.grade}</td>
                    <td style = {{textAlign:"center"}}><input className="chkbox" type="checkbox" value={records.index} onChange={this.hideRecord.bind(this)} checked={records.isHidden}></input></td>
                </tr>
                 </tbody>
        ))}
        </table>

        </center>
      </div>
    );
  }
}