import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Addintern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handleInputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = () => {
    axios
      .post("/Foradditem/addintern.php", this.state)
      .then((res) => {
        window.alert(res.data);
        this.setState({
          username: "",
          password: "",
        });
        return <Redirect to="/ihomepage/add" />;
      })
      .catch((err) => {
        window.alert(err);
      });
  };
  validate = (event) => {
    event.preventDefault();

    var username = document.forms["RegForm"]["username"];
    var password = document.forms["RegForm"]["password"];
    var x = true;
    if (username.value === "") {
      //window.alert("Please enter a valid username.");
      username.focus();
      x = false;
    } else if (password.value === "") {
      //window.alert("Please enter your password.");
      password.focus();
      x = false;
    } else {
      x = true;
    }
    if (x === true) {
      this.handleSubmit();
    }
  };
  render() {
    return (
      <div className="form-group">
        <form name="RegForm">
          <div className="er">
            <legend>Username and password</legend>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Username"
                required
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                required
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input
                type="checkbox"
                id="showpassword"
                name="showpassword"
                className="custom-control-input"
                onChange={(event) => {
                  var x = document.getElementById("password");
                  event.target.checked
                    ? (x.type = "text")
                    : (x.type = "password");
                }}
              />
              <label htmlFor="showpassword" className="custom-control-label">
                Show Password:
              </label>
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.validate}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Addintern;
