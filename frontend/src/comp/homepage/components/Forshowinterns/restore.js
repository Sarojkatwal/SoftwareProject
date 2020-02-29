import React, { Component } from "react";
import axios from "axios";

class Restore extends Component {
  constructor(props) {
    super(props);
    this.state = { username: props.dat.Username, password: "", admin: 0 };
    console.log(props);
  }
  handleInputChange = event => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = () => {
    var x = window.confirm("Do you want to restore?");
    if (x === true) {
      axios
        .post("/Foradditem/addadmin.php", this.state)
        .then(res => {
          var sql =
            "UPDATE internsdetail SET  Status = 'Active' WHERE Username ='" +
            this.state.username +
            "'";
          console.log(sql);
          axios
            .post("/store.php", sql)
            .then(res1 => {
              alert(res1.data);
              this.props.action();
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(err => {
          alert(err);
        });
    }
  };
  validate = e => {
    e.preventDefault();
    var username = document.forms["RegForm"]["username"];
    var password = document.forms["RegForm"]["password"];
    var x = true;
    if (username.value === "") {
      window.alert("Please enter a valid username.");
      username.focus();
      x = false;
    } else if (password.value === "") {
      window.alert("Please enter your password.");
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
      <div>
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
                disabled
                value={this.state.username}
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
                onChange={event => {
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
        </form>
        <input
          type="submit"
          value="Restore"
          className="btn btn-danger"
          onClick={e => this.validate(e, this.handleSubmit)}
        />
        <input
          type="submit"
          value="Back"
          className="btn btn-primary"
          onClick={this.props.action}
          style={{ float: "right" }}
        />
      </div>
    );
  }
}

export default Restore;
