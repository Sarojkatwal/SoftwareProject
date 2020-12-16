import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Assignproject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: "",
      uid: "",
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
        //console.log("res=", res.data);
        if (res.data.Userinfo !== undefined) {
          this.setState({
            ...this.state,
            allusers: res.data.Userinfo,
          });
        }
        if (res.data.Pinfo !== undefined) {
          this.setState({
            ...this.state,
            allprojects: res.data.Pinfo,
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
    if (name === "uid" && this.state.collectusers.includes(value) === false) {
      this.setState({
        ...this.state,
        collectusers: [...this.state.collectusers, value],
      });
    }
  };
  handleSubmit = () => {
    var myobj = {
      pid: parseInt(this.state.pid),
      uid: this.state.collectusers,
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
    var pname = document.forms["RegForm"]["pid"];
    var uname = document.forms["RegForm"]["uid"];
    var tme = document.forms["RegForm"]["timelimit"];
    var x = true;
    if (this.state.pid === "") {
      pname.focus();
      x = false;
    } else if (this.state.collectusers.toString() === "") {
      uname.focus();
      x = false;
    } else if (this.state.timelimit == 0) {
      tme.focus();
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
        pid: "",
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
        <option key={i} value={x.Uid}>
          {`${x.Username}(${x.Uid})`}
        </option>
      );
    });
    const yy = this.state.allprojects.map((y, i) => {
      return (
        <option key={i} value={y.Pid}>
          {`${y.Projectname.slice(0, 40)}...(${y.Pid})`}
        </option>
      );
    });
    const zz = this.state.allusers.map((x, i) => {
      return (
        this.state.collectusers.includes(x.Uid) && (
          <li key={i}>{`${x.Username}(${x.Uid})`}</li>
        )
      );
    });
    //console.log(this.state.collectusers);
    return (
      <div>
        <form name="RegForm">
          <div className="form-group">
            <label htmlFor="pid">Project:</label>
            <select
              name="pid"
              className="custom-select"
              required
              onChange={this.handleInputChange}
            >
              <option value="-----------" selected disabled>
                Project Name(Pid)
              </option>
              {yy}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="uid">Username:</label>
            <select
              name="uid"
              className="custom-select"
              required
              onChange={this.handleInputChange}
            >
              <option value="-----------" selected disabled>
                Username(Uid)
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
