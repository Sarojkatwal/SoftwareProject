import React, { Component } from "react";
import axios from "axios";
import Showdetail from "./forprojectlist/showdetail.js";
import Addeditintern from "./forprojectlist/addeditintern.js";

class Projectlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allprojects: [],
      spproject: {},
      filterdata: "",
      loaded: false,
      loader1: false,
      loader2: false,
      sqls:
        "SELECT p.Pid,Pstatus,Githublink,Description,Projectname,Assigneddate,Enddate,Uid,Username," +
        "UPstatus FROM projectdetail p LEFT JOIN (SELECT * FROM projectuser " +
        "NATURAL JOIN internuser ) s ON p.Pid=s.Pid AND Pstatus NOT IN('Completed')",
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    if (this.props.sqls !== undefined) {
      this.xx = this.props.sqls;
    } else {
      this.xx = this.state.sqls;
    }
    axios
      .post("/fetchallprojects.php", this.xx)
      .then((res) => {
        //console.log("All PRojects:", res.data);
        if (res.data !== undefined) {
          this.setState({
            ...this.state,
            allprojects: res.data,
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
      spproject: x,
    });
  };
  handler1 = () => {
    this.setState({
      ...this.state,
      loader1: false,
    });
  };
  handler2 = () => {
    this.setState({
      ...this.state,
      loader2: false,
    });
    this.loaddata();
  };

  render() {
    const xx =
      this.state.allprojects.length !== 0 ? (
        this.state.allprojects.map((x, i) => {
          let xx = x.Pid.toLowerCase().indexOf(this.state.filterdata);
          return (
            xx !== -1 && (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{x.Pid}</td>
                <td>{x.Status}</td>
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
                {sessionStorage.getItem("type") === "matchedasadmin" && (
                  <td>
                    <button
                      name="loader2"
                      className="btn btn-danger"
                      disabled={x.Status === "Completed" ? "disabled" : ""}
                      style={{
                        marginTop: "-10px",
                        marginRight: "30px",
                      }}
                      onClick={(e) => this.handleSubmit(x, "loader2")}
                    >
                      Edit
                    </button>
                  </td>
                )}
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
          this.state.loader2 === false ? (
            <>
              <h1 style={{ textAlign: "center" }}>All Projects</h1>
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Search..."
                id="myInput"
                onChange={(event) =>
                  this.setState({
                    ...this.state,
                    filterdata: event.target.value.toLowerCase(),
                  })
                }
              />
              <table className="table table-hover  table-responsive-md">
                <thead className="thead-dark">
                  <tr>
                    <th>SN</th>
                    <th>ProjectId</th>
                    <th>Status</th>
                    <th>Action1</th>
                    {sessionStorage.getItem("type") === "matchedasadmin" && (
                      <th>Action2</th>
                    )}
                  </tr>
                </thead>
                <tbody>{xx}</tbody>
              </table>
            </>
          ) : (
            <Addeditintern action={this.handler2} dat={this.state.spproject} />
          )
        ) : (
          <Showdetail action={this.handler1} dat={this.state.spproject} />
        )}
      </div>
    );
  }
}
export default Projectlist;
