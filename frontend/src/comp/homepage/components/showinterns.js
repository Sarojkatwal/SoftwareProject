import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router";
import Delete from "./Forshowinterns/delete.js";
import Edit from "./Forshowinterns/edit.js";
import Showdetail from "./Forshowinterns/showdetail.js";

class Showinterns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allinterns: [],
      spintern: {},
      loader1: false,
      loader2: false,
      loader3: false
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    const sql = "SELECT * FROM  internsdetail";
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
  handleSubmit = (x, n) => {
    const name = n;
    this.setState({
      ...this.state,
      [name]: true,
      spintern: x
    });
  };
  handler1 = () => {
    this.setState({
      ...this.state,
      loader1: false
    });
    this.loaddata();
  };
  handler2 = () => {
    this.setState({
      ...this.state,
      loader2: false
    });
    this.loaddata();
  };
  handler3 = () => {
    this.setState({
      ...this.state,
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
              Remove
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
                <h1 style={{ textAlign: "center" }}>Interns Detail</h1>
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
            ) : (
              <Delete action={this.handler3} dat={this.state.spintern} />
            )
          ) : (
            <Edit action={this.handler2} dat={this.state.spintern} />
          )
        ) : (
          <Showdetail action={this.handler1} dat={this.state.spintern} />
        )}
      </div>
    );
  }
}

export default Showinterns;
