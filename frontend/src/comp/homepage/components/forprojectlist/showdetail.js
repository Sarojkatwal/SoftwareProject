import React, { Component } from "react";

class Showdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: this.props.dat.Projectname,
      description: this.props.dat.Description,
      assignedto: this.props.dat.Assignedto,
      assigneddate: this.props.dat.Assigneddate,
      enddate: this.props.dat.Enddate,
      status: this.props.dat.Status,
      githublink: this.props.dat.Githublink
    };
  }
  render() {
    return (
      <>
        <h1>Detail</h1>
        <table className="table table-hover  table-responsive-lg">
          <tbody style={{ textAlign: "left" }}>
            <tr>
              <td>Projectname</td>
              <td>{this.state.projectname}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{this.state.description}</td>
            </tr>
            {this.state.status !== "Notassigned" && (
              <>
                <tr>
                  <td>Assignedto</td>
                  <td>{this.state.assignedto}</td>
                </tr>
                <tr>
                  <td>Assigneddate</td>
                  <td>{this.state.assigneddate}</td>
                </tr>
                <tr>
                  <td>Enddate</td>
                  <td>{this.state.enddate}</td>
                </tr>
              </>
            )}
            <tr>
              <td>Status</td>
              <td>{this.state.status}</td>
            </tr>
            {this.state.status === "Completed" && (
              <tr>
                <td>Githublink</td>
                <td>{this.state.Githublink}</td>
              </tr>
            )}
          </tbody>
        </table>
        <input
          type="submit"
          className="btn btn-primary"
          value="Goback"
          onClick={this.props.action}
        />
      </>
    );
  }
}

export default Showdetail;
