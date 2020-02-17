import React, { Component } from "react";
import axios from "axios";

class Assignproject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      username: "",
      timelimit: 0,
      allusers: [],
      allprojects: []
    };
  }
  componentDidMount() {
    axios
      .get("/dataforassign.php")
      .then(res => {
        this.setState({
          ...this.state,
          allusers: res.data.Username,
          allprojects: res.data.Projectname
        });
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
  };
  handleSubmit = () => {
    console.log(this.state);
    var myobj = {
      projectname: this.state.projectname,
      username: this.state.username,
      assigneddate: new Date(),
      enddate: new Date(
        new Date().getTime() + 86400000 * 30 * this.state.timelimit
      )
    };
    axios
      .post("/assignproject.php", myobj)
      .then(res => {
        alert(res.data);
      })
      .catch(err => {
        alert(err);
      });
  };
  validate = e => {
    e.preventDefault();
    var pname = document.forms["RegForm"]["projectname"];
    var uname = document.forms["RegForm"]["username"];
    var x = true;
    if (this.state.projectname === "") {
      pname.focus();
      x = false;
    } else if (this.state.username === "") {
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
                ProjectName
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
            <br />
            <div className="form-group">
              <label htmlFor="timelimit">Time to complete(in Months):</label>
              <input
                type="number"
                id="atimelimit"
                name="timelimit"
                className="form-control"
                placeholder="0"
                required
                value={this.state.timelimit}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <br />
            <input
              type="submit"
              value="AssignProject"
              className="btn btn-primary"
              onClick={this.validate}
            />
          </div>
        </form>
      </div>
    );
  }
}
export default Assignproject;
