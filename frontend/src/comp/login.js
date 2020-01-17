import React, { Component } from "react";
import "./login.css";
import Img from "./person.png";
import Img2 from "./pic2.png";
import Bg from "./bg.jpg";
import auth from "../auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      admin: true
    };
  }
  handleInputChange = event => {
    const target = event.target;
    let value = target.value;
    if (target.type === "radio") {
      if (value === "Admin") {
        value = true;
      } else {
        value = false;
      }
    }
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    alert(
      "You have submitted the input successfully: " +
        this.state.username +
        " " +
        this.state.password +
        " " +
        this.state.admin
    );
    event.preventDefault();
    !this.state.admin &&
      auth.login(() => {
        this.props.history.push("/ihomepage");
      });
  };
  render() {
    return (
      <div className="background">
        <img src={Bg} alt={Bg} className="span" />
        <div className="container">
          <img src={Img} alt={Img2} height="150px" width="150px" />
          <br />
          <br />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          Login as a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Admin
          <input
            type="radio"
            name="admin"
            value="Admin"
            checked={this.state.admin}
            onChange={this.handleInputChange}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Intern
          <input
            type="radio"
            name="admin"
            value="Intern"
            checked={!this.state.admin}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default Login;
