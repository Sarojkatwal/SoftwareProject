import React, { Component } from "react";

class Showpersonalinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spintern: this.props.dat
    };
    console.log(this.state.spintern);
  }
  render() {
    return (
      <>
        <h1>Interns Detail</h1>
        <table className="table table-hover  table-responsive-md">
          <tbody>
            <tr>
              <td>Firstname</td>
              <td>{this.state.spintern.Firstname}</td>
            </tr>
            <tr>
              <td>Lastname</td>
              <td>{this.state.spintern.Lastname}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{this.state.spintern.Address}</td>
            </tr>
            <tr>
              <td>Qualification</td>
              <td>{this.state.spintern.Qualification}</td>
            </tr>
            <tr>
              <td>Experience</td>
              <td>{this.state.spintern.Experience}</td>
            </tr>
            <tr>
              <td>Religion</td>
              <td>{this.state.spintern.Religion}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{this.state.spintern.Gender}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default Showpersonalinfo;
