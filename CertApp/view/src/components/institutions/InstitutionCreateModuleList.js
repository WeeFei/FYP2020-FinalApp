// Create Modules Page

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import mainContract from "../../contracts/mainContract.json";
import getWeb3 from "../../getWeb3";
import Modules from "./modules";
import "./style.css";

class InstitutionCreateModuleList extends Component {
  state = { web3: null, 
            accounts: null, 
            contract: null, 
            code: '', 
            description: '', 
            type: '', 
            credit: "", 
            modules: [] };

  componentDidMount = async () => {
    try {
      this.handleCodeChange = this.handleCodeChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.handleTypeChange = this.handleTypeChange.bind(this);
      this.handleCreditChange = this.handleCreditChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);

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
      this.setState({ web3, accounts, contract: instance }, this.renderModules);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert (
        `Failed to load Web3, Accounts, or Contract.`,
      );
      console.error(error);      
    }
  };

  handleCodeChange(event) {
    this.setState({code: event.target.value});
    console.log(this.state.code);
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
    console.log(this.state.description);
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
    console.log(this.state.type);
  }

  handleCreditChange(event) {
    this.setState({credit: event.target.value});
    console.log(this.state.credit);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const{ accounts, contract } = this.state;
    if (this.state.code !== "" && this.state.description != "" && this.state.type !=="" && this.state.credit !== "")
    await contract.methods.createModule(this.state.code, this.state.description, this.state.type, this.state.credit).send({from: accounts[0]});
    this.renderModules();
    this.setState({code: ''});
    this.setState({description: ''});
    this.setState({type: ''});
    this.setState({credit: ''});
 }

 async renderModules() {
   const { contract } = this.state;
   const moduleCount = await contract.methods.moduleCount().call();
   let modules = [];

   for(let i = 1; i<= moduleCount; i++) {
     const module = await contract.methods.modules(i).call();
     if(!module[5])
       modules.push(module);
   }
   this.setState({modules: modules});
   console.log(modules);
 }

 async handleDelete(event) {
   const {contract, accounts} = this.state;
   const code = event.target.id;
   await contract.methods.deleteModule(code).send({from: accounts[0]});
   await this.renderModules();
   console.log(code + " is deleted");
 }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, Accounts, and Contract...</div>;
    }
    else {
      return (
        <div className="container">
          <div>
            <Link to="/instProfile" className="textHome">Home</Link>
          </div>
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
                <h1 className="text-center" id="Header">Welcome to <span className="textModHeader">Create Module</span> Page</h1>
                <p className="text-center">This is a page for creating modules!</p>
            </div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <input  className="form-CreateMod" type="text" placeholder="Code" value={this.state.code} onChange={this.handleCodeChange.bind(this)}></input><br></br>
                <input  className="form-CreateMod" type="text" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}></input><br></br>
                <input  className="form-CreateMod" type="text" placeholder="Type" value={this.state.type} onChange={this.handleTypeChange.bind(this)}></input><br></br>
                <input  className="form-CreateMod" type="number" placeholder="Credit" value={this.state.credit} onChange={this.handleCreditChange.bind(this)}></input><br></br>
                <input className="createModBtn" type="submit" value="Add Module"></input>
              </form>
              <br></br><br></br><br></br><br></br>
              <Modules modules={this.state.modules} handleDelete={this.handleDelete}></Modules>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default InstitutionCreateModuleList
