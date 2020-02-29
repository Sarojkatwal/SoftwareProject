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
      loader1: false,
      loader2: false,
      sqls:
        "SELECT * FROM  projectdetail WHERE Status IN('Assigned','Notassigned')"
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
      .then(res => {
        if (res.data !== undefined) {
          this.setState({
            allprojects: res.data
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }
  handleSubmit = (x, n) => {
    const name = n;
    this.setState({
      ...this.state,
      [name]: true,
      spproject: x
    });
  };
  handler1 = () => {
    this.setState({
      ...this.state,
      loader1: false
    });
  };
  handler2 = () => {
    this.setState({
      ...this.state,
      loader2: false
    });
  };

  render() {
    const xx = this.state.allprojects.map((x, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{x.Projectname}</td>
          <td>{x.Status}</td>
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
          {sessionStorage.getItem("type") === "matchedasadmin" && (
            <td>
              <button
                name="loader2"
                className="btn btn-danger"
                disabled={x.Status === "Completed" ? "disabled" : ""}
                style={{
                  marginTop: "-10px",
                  marginRight: "30px"
                }}
                onClick={e => this.handleSubmit(x, "loader2")}
              >
                Edit
              </button>
            </td>
          )}
        </tr>
      );
    });
    return (
      <div>
        {this.state.loader1 === false ? (
          this.state.loader2 === false ? (
            <>
              <h1 style={{ textAlign: "center" }}>All Projects</h1>
              {this.state.allprojects && this.state.allprojects.length !== 0 && (
                <table className="table table-hover  table-responsive-lg">
                  <thead className="thead-dark">
                    <tr>
                      <th>SN</th>
                      <th>ProjectName</th>
                      <th>Status</th>
                      <th>Action1</th>
                      {sessionStorage.getItem("type") === "matchedasadmin" && (
                        <th>Action2</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>{xx}</tbody>
                </table>
              )}
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
