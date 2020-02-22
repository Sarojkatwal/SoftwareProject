import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Addintern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      fname: "",
      lname: "",
      address: "",
      experience: "",
      qualification: "",
      nationality: "",
      religion: "",
      gender: "Male"
    };
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
    axios
      .post("/Foradditem/addintern.php", this.state)
      .then(res => {
        window.alert(res.data);
        this.setState({
          username: "",
          password: "",
          fname: "",
          lname: "",
          address: "",
          experience: "",
          qualification: "",
          nationality: "",
          religion: "",
          gender: "Male"
        });
        return <Redirect to="/ihomepage/add" />;
      })
      .catch(err => {
        window.alert(err);
      });
  };
  validate = event => {
    event.preventDefault();
    var lname = document.forms["RegForm"]["lname"];
    var fname = document.forms["RegForm"]["fname"];
    var username = document.forms["RegForm"]["username"];
    var password = document.forms["RegForm"]["password"];
    var nationality = document.forms["RegForm"]["nationality"];
    var religion = document.forms["RegForm"]["religion"];
    var address = document.forms["RegForm"]["address"];
    var qualification = document.forms["RegForm"]["qualification"];
    var experience = document.forms["RegForm"]["experience"];
    var gender = document.forms["RegForm"]["gender"];
    var x = true;
    if (fname.value === "") {
      //window.alert("Please enter your First name.");
      fname.focus();
      x = false;
    } else if (lname.value === "") {
      // window.alert("Please enter your Last name.");
      lname.focus();
      x = false;
    } else if (address.value === "") {
      //window.alert("Please enter your address.");
      address.focus();
      x = false;
    } else if (experience.value === "") {
      //window.alert("Please enter your experience .");
      experience.focus();
      x = false;
    } else if (qualification.value === "") {
      // window.alert("Please enter your qualification.");
      qualification.focus();
      x = false;
    } else if (nationality.value === "") {
      //window.alert("Please enter your nationality.");
      nationality.focus();
      x = false;
    } else if (religion.value === "") {
      //window.alert("Please enter your religion.");
      religion.focus();
      x = false;
    } else if (gender.value === "") {
      // window.alert("Please enter your gender.");
      gender.focus();
      x = false;
    } else if (username.value === "") {
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
            <legend>Personal information</legend>
            <div className="form-group">
              <label htmlFor="fname">First name:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="form-control"
                placeholder="Firstname.."
                value={this.state.fname}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                id="lname"
                name="lname"
                className="form-control"
                placeholder="Lastname.."
                required
                value={this.state.lname}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                placeholder="Address.."
                required
                value={this.state.address}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience:</label>
              <select
                name="experience"
                className="custom-select"
                required
                onChange={this.handleInputChange}
              >
                <option value="-----------" selected disabled>
                  Experience
                </option>
                <option value="<1 year"> 1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value=">3 years">>3 years</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="qualification">Qualification:</label>
              <select
                name="qualification"
                className="custom-select"
                required
                onChange={this.handleInputChange}
              >
                <option value="-----------" selected disabled>
                  Qualification
                </option>
                <option value="Bachelor in Computer Eng.">
                  Bachelor in Computer Eng.
                </option>
                <option value="Master in Computer Eng.">
                  Master in Computer Eng.
                </option>
                <option value="Bachelor in Electronics Eng.">
                  Bachelor in Electronics Eng.
                </option>
                <option value="Master in Electronics Eng.">
                  Master in Electronics Eng.
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                className="form-control"
                placeholder="Nationality"
                required
                value={this.state.nationality}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="religion">Religion:</label>
              <input
                type="text"
                id="religion"
                name="religion"
                className="form-control"
                placeholder="Religion"
                required
                value={this.state.religion}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <br />
              <div className="form-check-inline">
                <label className="form-check-label" htmlFor="radio1">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="male"
                    name="gender"
                    value="Male"
                    onChange={this.handleInputChange}
                    checked
                  />
                  Male
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label" htmlFor="radio2">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="female"
                    name="gender"
                    value="Female"
                    onChange={this.handleInputChange}
                  />
                  Female
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="others"
                    name="gender"
                    value="Others"
                    onChange={this.handleInputChange}
                  />
                  Others
                </label>
              </div>
            </div>
          </div>
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
