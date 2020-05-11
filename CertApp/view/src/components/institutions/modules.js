import React, {Component} from 'react';
import "./style.css";

class Modules extends Component{

  render(){
    const modules = this.props.modules;

    return(
      <div>
        <center><h1 className="text-center" id="Header"><span className="textModHeader">Module List</span></h1></center>
        <div class='table-responsive'><br></br>
            <center>
              <table id="tablePreview" className="table table-hover table-borderless" id="tableModStyle">
                <thead>
                  <tr>
                  <th>Module Code</th>
                  <th>Module Description</th>
                  <th>Module Type</th>
                  <th>Module Credit</th>
                  <th></th>
                  </tr>
                </thead>
        {modules.map((modules) => (
                 <tbody key={modules.code}>
                 <tr scope="row">
                 <td>{modules.code}</td>
                 <td>{modules.description}</td>
                 <td>{modules.moduleType}</td>
                 <td>{modules.credit}</td>
                 <td>
                 <button className="btnDelete" id={modules.code} onClick={this.props.handleDelete.bind(this)}>Delete</button>
                 </td>
              </tr>
                 </tbody>
        ))}
        </table>
              </center>
          </div>
      </div>
    )
  }
}

export default Modules;