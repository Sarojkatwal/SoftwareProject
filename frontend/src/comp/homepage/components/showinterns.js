import React, { Component } from "react";
import axios from "axios";
import Delete from "./Forshowinterns/delete.js";
import Restore from "./Forshowinterns/restore.js";
import Edit from "./Forshowinterns/edit.js";
import Showdetail from "./Forshowinterns/showdetail.js";
import Notification from "../notification.js";

class Showinterns extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allinterns: [],
      spintern: {},
      spprojects: [],
      status: "Active",
      loaded1: false,
      loader1: false,
      loader2: false,
      loader3: false,
      filterdata: "",
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
      .then((res) => {
        if (res.data !== undefined) {
          this.setState({
            ...this.state,
            allinterns: res.data,
            loaded1: true,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    //console.log(value);
    this.setState(
      {
        ...this.state,
        status: value,
      },
      () => {
        this.loaddata();
      }
    );
  };
  loadprojects = (x) => {
    const name = x;
    const sql =
      "SELECT * FROM projectuser WHERE Username='" +
      this.state.spintern.Username +
      "'";
    axios
      .post("/projectforintern.php", sql)
      .then((res1) => {
        if (res1.data[0] !== undefined) {
          this.setState({
            ...this.state,
            spprojects: res1.data,
          });
        }
      })
      .then(() => {
        this.setState({
          ...this.state,
          [name]: true,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  handleSubmit = (x, n) => {
    this.setState(
      {
        ...this.state,
        spintern: x,
      },
      () => {
        if (n === "loader1") {
          this.loadprojects(n);
          console.log("Loaded projects");
        } else {
          this.setState({
            ...this.state,
            [n]: true,
          });
        }
      }
    );
  };
  handler1 = () => {
    this.setState({
      ...this.state,
      loader1: false,
      spintern: {},
      spprojects: [],
    });
    this.loaddata();
  };
  handler2 = () => {
    this.setState({
      ...this.state,
      spintern: {},
      spprojects: [],
      loader2: false,
    });
    this.loaddata();
  };
  handler3 = () => {
    this.setState({
      ...this.state,
      spintern: {},
      spprojects: [],
      loader3: false,
    });
    this.loaddata();
  };

  render() {
    const xx =
      this.state.allinterns.length != 0 ? (
        this.state.allinterns.map((x, i) => {
          let xx = x.Firstname.toLowerCase().indexOf(this.state.filterdata);
          let yy = x.Lastname.toLowerCase().indexOf(this.state.filterdata);
          return (
            (xx !== -1 || yy !== -1) && (
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
                      marginRight: "30px",
                    }}
                    onClick={(e) => this.handleSubmit(x, "loader1")}
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
                      marginRight: "30px",
                    }}
                    onClick={(e) => this.handleSubmit(x, "loader2")}
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
                      marginRight: "30px",
                    }}
                    onClick={() => this.handleSubmit(x, "loader3")}
                  >
                    {this.state.status === "Active" ? "Remove" : "Restore"}
                  </button>
                </td>
              </tr>
            )
          );
        })
      ) : this.state.loaded1 ? (
        <tbody>No data found</tbody>
      ) : (
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td class="spinner-border text-success mx-auto" />
        </tr>
      );
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
                      <option value="Active" selected>
                        Active
                      </option>
                      <option value="Notactive">Ex</option>
                    </select>
                  </div>
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
            <Edit
              {...this.props}
              action={this.handler2}
              dat={this.state.spintern}
            />
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
