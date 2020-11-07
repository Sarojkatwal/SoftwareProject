import React, { Component } from "react";
import axios from "axios";
import Showmessage from "./Formessage/showmessage.js";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iora: sessionStorage.getItem("type") === "matchedasintern" ? 1 : 0,
      allinterns: [],
      spintern: {},
      loaded: false,
      loader1: false,
      filterdata: "",
      disabled:
        sessionStorage.getItem("type") === "matchedasintern" ? true : false,
    };
  }
  componentDidMount() {
    this.loaddata();
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState(
      {
        ...this.state,
        iora: value,
      },
      () => {
        this.loaddata();
      }
    );
  };

  loaddata() {
    const ownid = sessionStorage.getItem("username");
    const sql =
      "SELECT * FROM  internsdetail i RIGHT JOIN internuser iu ON i.Uid=iu.Uid WHERE Username !='" +
      ownid +
      "' AND Status='Active' " +
      "AND Admin='" +
      this.state.iora +
      "'";
    axios
      .post("/fetchinfo.php", sql)
      .then((res) => {
        if (res.data !== undefined) {
          this.setState({
            ...this.state,
            allinterns: res.data,
            loaded: true,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  handleSubmit = (x, n) => {
    const name = n;
    this.setState({
      ...this.state,
      [name]: true,
      spintern: x,
    });
  };
  handler1 = () => {
    this.setState({
      ...this.state,
      loader1: false,
    });
    this.loaddata();
  };
  render() {
    //console.log(this.state.iora == 0);
    const xx =
      this.state.allinterns.length != 0 ? (
        this.state.allinterns.map((x, i) => {
          let xx = x.Username.toLowerCase().indexOf(this.state.filterdata);
          return (
            xx !== -1 && (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{x.Username}</td>
                <td></td>
                <td>
                  <button
                    name="loader1"
                    className="btn btn-primary"
                    style={{
                      marginTop: "-5px",
                      marginRight: "30px",
                    }}
                    onClick={(e) => this.handleSubmit(x, "loader1")}
                  >
                    Message
                  </button>
                </td>
              </tr>
            )
          );
        })
      ) : this.state.loaded ? (
        <tbody>No data found</tbody>
      ) : (
        <tr>
          <td></td>
          <td></td>
          <td class="spinner-border text-success mx-auto" />
        </tr>
      );
    return (
      <div>
        {this.state.loader1 === false ? (
          <>
            <h1 style={{ textAlign: "center" }}>Interns Detail</h1>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                id="myInput"
                onChange={(event) =>
                  this.setState({
                    ...this.state,
                    filterdata: event.target.value.toLowerCase(),
                  })
                }
              />
              <div class="input-group-append">
                <select
                  name="status"
                  className="custom-select"
                  onChange={this.handleInputChange}
                >
                  <option
                    value={0}
                    selected={this.state.iora == 0}
                    disabled={this.state.disabled}
                  >
                    Intern
                  </option>
                  <option value={1} selected={this.state.iora == 1}>
                    Admin
                  </option>
                </select>
              </div>
            </div>
            <table className="table table-hover  table-responsive-md">
              <thead className="thead-dark">
                <tr>
                  <th>SN</th>
                  <th>Username</th>
                  <th></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{xx}</tbody>
            </table>
          </>
        ) : (
          <Showmessage action={this.handler1} dat={this.state.spintern} />
        )}
      </div>
    );
  }
}

export default Message;
