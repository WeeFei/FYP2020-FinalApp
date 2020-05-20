// Student Verification Page

import React, { Component } from 'react'
import { studVerify } from './StudentFunctions'
import getWeb3 from "../../getWeb3"
import mainContract from "../../contracts/mainContract.json"
import { Link, withRouter } from 'react-router-dom';

class StudentVerification extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      accountNumberGen: '',
      usernameError: '',
      accountNumberGenError: '',
      web3: null, 
      accounts: null, 
      contract: null, 
      records: [], 
      account: '', 
      bcAccounts: []
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount = async () => {
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
    console.log(accountCount);

    for(let i = 1; i<= accountCount; i++){
      const account = await contract.methods.accounts(i).call();
        accounts.push(account);
  }
  this.setState({bcAccounts: accounts});
  console.log(accounts);
}

  onChange1(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.username)
  }

  onChange2(e) {
    this.setState({accountNumberGen: e.target.value})
    console.log(this.state.accountNumberGen)
  }

  onSubmit(e) {
    e.preventDefault()

    const user = {
      username: this.state.username,
      accountNumberGen: this.state.accountNumberGen
    }

    const isValid = this.validate()
    if (isValid)

    studVerify(user).then(res => {
        const {contract, accounts} = this.state;
        contract.methods.addAccount(this.state.accountNumberGen, this.state.username).send({from: accounts[0]});  
        this.setState({username: ''});
        this.setState({accountNumberGen: ''});
      })
  }

  validate = () => {
    let usernameError="";
    let accountNumberGenError="";

    if (!this.state.username) {
      usernameError = 'Username Cannot Be Blank'
    }

    if (!this.state.accountNumberGen) {
      accountNumberGenError = 'Account Number Cannot Be Blank'
    }

    if (usernameError || accountNumberGenError) {
      this.setState({usernameError, accountNumberGenError});
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="container"><br></br>
      <div>
        <Link to="/instProfile" className="textHome">Home</Link>
      </div>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h2 mb-3" id="Header">Student Verification</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.onChange1.bind(this)}
                />
              </div>
              <div style={{ color: "red" }}>
                {this.state.usernameError}
              </div>
              <div className="form-group">
                <label htmlFor="accountnumber">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="accountNumberGen"
                  placeholder="Enter Account Number"
                  value={this.state.accountNumberGen}
                  onChange={this.onChange2.bind(this)}
                />
              </div>
              <div style={{ color: "red" }}>
                {this.state.accountNumberGenError}
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentVerification