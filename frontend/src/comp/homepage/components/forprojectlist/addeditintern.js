import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Addeditintern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: this.props.dat.Projectname,
      description: this.props.dat.Description,
      assignedto: this.props.dat.Assignedto,
      assigneddate: this.props.dat.Assigneddate,
      enddate: this.props.dat.Enddate,
      status: this.props.dat.Status,
      githublink: this.props.dat.Githublink,
      username: "",
      timelimit: 0,
      allusers: [],
      collectusers: [],
      redirect: false
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    axios
      .get("/dataforassign.php")
      .then(res => {
        if (
          res.data.Username !== undefined &&
          res.data.Projectname !== undefined
        ) {
          this.setState({
            ...this.state,
            allusers: res.data.Username
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }
  handleInputChange = event => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: value
    });
    if (
      name === "username" &&
      this.state.collectusers.includes(value) === false
    ) {
      this.setState({
        ...this.state,
        collectusers: [...this.state.collectusers, value]
      });
    }
  };

  delete = () => {
    var x = window.confirm("Do you want to delete?");
    if (x === true) {
      var sql =
        "DELETE FROM Projectdetail WHERE Projectname='" +
        this.state.projectname +
        "'";
      axios
        .post("/store.php", sql)
        .then(res => {
          alert(res.data);
          this.setState({
            ...this.state,
            redirect: true
          });
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  handleSubmit = () => {
    const date = new Date(
      new Date(this.state.enddate).getTime() +
        86400000 * 30 * this.state.timelimit
    ).toISOString();
    var sql =
      "UPDATE projectdetail SET Assignedto='" +
      this.state.collectusers +
      " ', Enddate=' " +
      date +
      "' WHERE Projectname ='" +
      this.state.projectname +
      "'";
    axios
      .post("/store.php", sql)
      .then(res => {
        alert(res.data);
        this.setState({
          ...this.state,
          redirect: true
        });
      })
      .catch(err => {
        alert(err);
      });
  };

  validate(e, func) {
    e.preventDefault();
    var uname = document.forms["RegForm"]["username"];
    var x = true;
    if (this.state.collectusers.toString() === "") {
      uname.focus();
      x = false;
    } else {
      x = true;
    }
    if (x === true && this.state.status === "Assigned") {
      func();
    } else {
      if (this.state.status !== "Assigned") {
        alert("Project must be assigned");
        this.setState({
          ...this.state,
          redirect: true
        });
      }
    }
  }

  render() {
    const re = this.state.redirect;
    if (re === true) {
      this.setState({
        ...this.state,
        username: "",
        timelimit: 0,
        collectusers: [],
        redirect: false
      });
      this.loaddata();
      return <Redirect to="/ihomepage/projectlist" />;
    }
    const xx = this.state.allusers.map((x, i) => {
      return (
        <option key={i} value={x}>
          {x}
        </option>
      );
    });
    const zz = this.state.collectusers.map((z, i) => {
      return (
        <li key={i} value={z}>
          {z}
        </li>
      );
    });
    return (
      <div>
        <h1>
          <button
            value="DeleteProject"
            className="btn btn-light"
            onClick={this.props.action}
            style={{ float: "right" }}
          >
            <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
          </button>
        </h1>
        <h3>{this.state.projectname}</h3>

        <form name="RegForm">
          <div className="form-group">
            <label htmlFor="username">Add Users:</label>
            <select
              name="username"
              className="custom-select"
              required
              onChange={this.handleInputChange}
            >
              <option value="-----------" selected disabled>
                Username
              </option>
              {xx}
            </select>
            <br />
            <ol>{zz}</ol>
            <div className="form-group">
              <label htmlFor="timelimit">Time added(in Months):</label>
              <input
                type="number"
                id="atimelimit"
                name="timelimit"
                className="form-control"
                placeholder="0"
                min="0"
                required
                value={this.state.timelimit}
                onChange={this.handleInputChange}
              />
            </div>
            <input
              type="submit"
              value="Ok"
              className="btn btn-primary"
              onClick={e => this.validate(e, this.handleSubmit)}
            />
            <input
              type="submit"
              value="DeleteProject"
              className="btn btn-danger"
              onClick={this.delete}
              style={{ float: "right" }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Addeditintern;
