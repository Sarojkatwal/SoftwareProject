import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router";

class Showinterns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spintern: {},
      allprojects: []
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    const username = sessionStorage.getItem("username");
    const sql1 =
      "SELECT * FROM  internsdetail WHERE Username='" + username + "'";
    const sql2 =
      "SELECT * FROM projectdetail WHERE Assignedto LIKE '%" + username + "%'";
    axios
      .post("/fetchinfo.php", sql1)
      .then(res => {
        if (res.data[0] !== undefined) {
          this.setState({
            ...this.state,
            spintern: res.data[0]
          });
        }
      })
      .catch(err => {
        alert(err);
      });
    axios
      .post("/fetchallprojects.php", sql2)
      .then(res => {
        if (res.data !== undefined) {
          this.setState({
            ...this.state,
            allprojects: res.data
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    const xx = this.state.allprojects.map((x, i) => {
      return (
        <>
          <div class="card  " key={i}>
            <div class="card-header">
              <a
                class="collapsed card-link"
                data-toggle="collapse"
                href={`${"#collapse" + i}`}
              >
                {x.Projectname}
              </a>
            </div>
            <div
              id={`${"collapse" + i}`}
              class="collapse "
              data-parent="#accordion"
            >
              <div class="card-body">
                <table className="table table-stripedtable-responsive-sm ">
                  <tr>
                    <td>Assigned to</td>
                    <td>{x.Assignedto}</td>
                  </tr>
                  <tr>
                    <td>Assigneddate</td>
                    <td>{x.Assigneddate}</td>
                  </tr>
                  <tr>
                    <td>Enddate</td>
                    <td>{x.Enddate}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{x.Description}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    });
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
        <h1>Releated Projects</h1>
        <div id="accordion">{xx}</div>
      </>
    );
  }
}

export default Showinterns;
