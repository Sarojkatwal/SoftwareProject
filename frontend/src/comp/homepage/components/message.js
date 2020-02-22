import React, { Component } from "react";
import axios from "axios";
import Showmessage from "./Formessage/showmessage.js";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allinterns: [],
      spintern: {},
      loader1: false
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    axios
      .get("/fetchinfo.php")
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
  render() {
    const xx = this.state.allinterns.map((x, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{x.Firstname}</td>
          <td>{x.Username}</td>
          <td>
            <button
              name="loader1"
              className="btn btn-primary"
              style={{
                marginTop: "-5px",
                marginRight: "30px"
              }}
              onClick={e => this.handleSubmit(x, "loader1")}
            >
              Message
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        {this.state.loader1 === false ? (
          <>
            <h1 style={{ textAlign: "center" }}>Interns Detail</h1>
            <table className="table table-hover  table-responsive-md">
              <thead className="thead-dark">
                <tr>
                  <th>SN</th>
                  <th>Firstname</th>
                  <th>Username</th>
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
