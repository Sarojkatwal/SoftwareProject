import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Assignproject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      username: "",
      timelimit: 0,
      allusers: [],
      allprojects: [],
      collectusers: [],
      redirect: false,
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    axios
      .get("/dataforassign.php")
      .then((res) => {
        if (res.data.Username !== undefined) {
          this.setState({
            ...this.state,
            allusers: res.data.Username,
          });
        }
        if (res.data.Projectname !== undefined) {
          this.setState({
            ...this.state,
            allprojects: res.data.Projectname,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  handleInputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: value,
    });
    if (
      name === "username" &&
      this.state.collectusers.includes(value) === false
    ) {
      this.setState({
        ...this.state,
        collectusers: [...this.state.collectusers, value],
      });
    }
  };
  handleSubmit = () => {
    var myobj = {
      projectname: this.state.projectname,
      username: this.state.collectusers,
      assigneddate: new Date(),
      enddate: new Date(
        new Date().getTime() + 86400000 * 30 * this.state.timelimit
      ),
    };
    axios
      .post("/assignproject.php", myobj)
      .then((res) => {
        alert(res.data);
        this.setState({
          ...this.state,
          redirect: true,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  validate = (e) => {
    e.preventDefault();
    var pname = document.forms["RegForm"]["projectname"];
    var uname = document.forms["RegForm"]["username"];
    var x = true;
    if (this.state.projectname === "") {
      pname.focus();
      x = false;
    } else if (this.state.collectusers.toString() === "") {
      uname.focus();
      x = false;
    } else {
      x = true;
    }
    if (x === true) {
      this.handleSubmit();
    }
  };

  render() {
    const re = this.state.redirect;
    if (re === true) {
      this.setState({
        ...this.state,
        projectname: "",
        username: "",
        timelimit: 0,
        collectusers: [],
        redirect: false,
      });
      this.loaddata();
      return <Redirect to="/ihomepage/astointern" />;
    }
    const xx = this.state.allusers.map((x, i) => {
      return (
        <option key={i} value={x}>
          {x}
        </option>
      );
    });
    const yy = this.state.allprojects.map((y, i) => {
      return (
        <option key={i} value={y}>
          {y}
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
        <form name="RegForm">
          <div className="form-group">
            <label htmlFor="projectname">ProjectName:</label>
            <select
              name="projectname"
              className="custom-select"
              required
              onChange={this.handleInputChange}
            >
              <option value="-----------" selected disabled>
                Projectname
              </option>
              {yy}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
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
              <label htmlFor="timelimit">Time to complete(in Months):</label>
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
              value="AssignProject"
              className="btn btn-primary"
              onClick={this.validate}
            />
            <input
              type="reset"
              value="Clear"
              className="btn btn-primary float-right"
              onClick={() =>
                this.setState({
                  ...this.state,
                  redirect: true,
                })
              }
            />
          </div>
        </form>
      </div>
    );
  }
}
export default Assignproject;
