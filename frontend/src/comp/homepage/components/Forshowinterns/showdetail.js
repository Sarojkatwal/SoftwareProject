import React, { Component } from "react";
class Showdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.dat.Username,
      fname: this.props.dat.Firstname,
      lname: this.props.dat.Lastname,
      address: this.props.dat.Address,
      experience: this.props.dat.Experience,
      qualification: this.props.dat.Qualification,
      nationality: this.props.dat.Nationality,
      religion: this.props.dat.Religion,
      gender: this.props.dat.Gender
    };
  }
  render() {
    return (
      <>
        <h1>{this.state.username}</h1>
        <table className="table table-hover  table-responsive-lg">
          <tbody style={{ textAlign: "left" }}>
            <tr>
              <td>Firstname</td>
              <td>{this.state.fname}</td>
            </tr>
            <tr>
              <td>Lastname</td>
              <td>{this.state.lname}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{this.state.address}</td>
            </tr>
            <tr>
              <td>Qualification</td>
              <td>{this.state.qualification}</td>
            </tr>
            <tr>
              <td>Experience</td>
              <td>{this.state.experience}</td>
            </tr>
            <tr>
              <td>Religion</td>
              <td>{this.state.religion}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{this.state.gender}</td>
            </tr>
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
