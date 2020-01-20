import React, { Component } from "react";
import "./login.css";
import Img from "./person.png";
import Img2 from "./pic2.png";
import Bg from "./bg.jpg";
import auth from "../auth";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      admin: true,
      matched: "notmatched"
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
    const obj = {
      UserName: this.state.username,
      Password: this.state.password,
      Admin: this.state.admin ? 1 : 0
    };
    axios
      .post("/checkuser.php", obj)
      .then(res => {
        this.setState({ matched: res.data });
        if (!this.state.admin && this.state.matched === "matched") {
          auth.login(() => {
            this.props.history.push("/ihomepage");
          });
        } else {
          alert("Insert correct username and password!!!");
        }
      })
      .catch(err => {
        console.error(err);
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
            id="saroj"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <div>
            Login as Admin
            <input
              type="radio"
              name="admin"
              value="Admin"
              checked={this.state.admin}
              onChange={this.handleInputChange}
            />
            Intern
            <input
              type="radio"
              name="admin"
              value="Intern"
              checked={!this.state.admin}
              onChange={this.handleInputChange}
            />
          </div>
          <br />
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default Login;
