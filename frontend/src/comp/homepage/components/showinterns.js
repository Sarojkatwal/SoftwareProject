import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router";
import Delete from "./Forshowinterns/delete.js";
import Restore from "./Forshowinterns/restore.js";
import Edit from "./Forshowinterns/edit.js";
import Showdetail from "./Forshowinterns/showdetail.js";
import Notification from "../notification.js";

class Showinterns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allinterns: [],
      spintern: {},
      spprojects: [],
      status: "Active",
      loader1: false,
      loader2: false,
      loader3: false
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    const sql =
      "SELECT * FROM  internsdetail WHERE Status='" + this.state.status + "'";
    axios
      .post("/fetchinfo.php", sql)
      .then(res => {
        if (res.data !== undefined) {
          this.setState({
            allinterns: res.data
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  handleInputChange = event => {
    const value = event.target.value;
    //console.log(value);
    this.setState(
      {
        ...this.state,
        status: value
      },
      () => {
        this.loaddata();
      }
    );
  };
  loadprojects = x => {
    const name = x;
    const sql =
      "SELECT * FROM projectdetail WHERE Assignedto LIKE '%" +
      this.state.spintern.Username +
      "%'";
    axios
      .post("/fetchallprojects.php", sql)
      .then(res1 => {
        if (res1.data[0] !== undefined) {
          this.setState({
            ...this.state,
            spprojects: res1.data
          });
        }
      })
      .then(res2 => {
        this.setState({
          ...this.state,
          [name]: true
        });
      })
      .catch(err => {
        alert(err);
      });
  };
  handleSubmit = (x, n) => {
    this.setState(
      {
        ...this.state,
        spintern: x
      },
      () => {
        this.loadprojects(n);
      }
    );
  };
  handler1 = () => {
    this.setState({
      ...this.state,
      loader1: false,
      spintern: {},
      spprojects: []
    });
    this.loaddata();
  };
  handler2 = () => {
    this.setState({
      ...this.state,
      spintern: {},
      spprojects: [],
      loader2: false
    });
    this.loaddata();
  };
  handler3 = () => {
    this.setState({
      ...this.state,
      spintern: {},
      spprojects: [],
      loader3: false
    });
    this.loaddata();
  };

  render() {
    const xx = this.state.allinterns.map((x, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{x.Firstname}</td>
          <td>{x.Lastname}</td>
          <td>
            <button
              name="loader1"
              className="btn btn-primary"
              style={{
                marginTop: "-10px",
                marginRight: "30px"
              }}
              onClick={e => this.handleSubmit(x, "loader1")}
            >
              Detail
            </button>
          </td>
          <td>
            <button
              name="loader2"
              className="btn btn-success"
              style={{
                marginTop: "-10px",
                marginRight: "30px"
              }}
              onClick={e => this.handleSubmit(x, "loader2")}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              name="loader3"
              className="btn btn-danger"
              style={{
                marginTop: "-10px",
                marginRight: "30px"
              }}
              onClick={() => this.handleSubmit(x, "loader3")}
            >
              {this.state.status === "Active" ? "Remove" : "Restore"}
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        {this.state.loader1 === false ? (
          this.state.loader2 === false ? (
            this.state.loader3 === false ? (
              <>
                <h1>
                  Interns Detail
                  <Notification />
                </h1>
                <div className="form-group">
                  <select
                    name="status"
                    className="custom-select"
                    onChange={this.handleInputChange}
                  >
                    <option value="Active" selected>
                      Active
                    </option>
                    <option value="Notactive">Ex</option>
                  </select>
                </div>
                <table className="table table-hover  table-responsive-lg">
                  <thead className="thead-dark">
                    <tr>
                      <th>SN</th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Action1</th>
                      <th>Action2</th>
                      <th>Action3</th>
                    </tr>
                  </thead>
                  <tbody>{xx}</tbody>
                </table>
              </>
            ) : this.state.status === "Active" ? (
              <Delete
                {...this.props}
                action={this.handler3}
                dat={this.state.spintern}
              />
            ) : (
              <Restore
                {...this.props}
                action={this.handler3}
                dat={this.state.spintern}
              />
            )
          ) : (
            <Edit action={this.handler2} dat={this.state.spintern} />
          )
        ) : (
          <Showdetail
            {...this.props}
            action={this.handler1}
            dat={this.state.spintern}
            proj={this.state.spprojects}
          />
        )}
      </div>
    );
  }
}

export default Showinterns;
