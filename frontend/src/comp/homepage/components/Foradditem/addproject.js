import React, { Component } from "react";
import axios from "axios";

class Addproject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      Projectdescription: ""
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
      .post("/Foradditem/addproject.php", this.state)
      .then(res => {
        alert(res.data);
        this.setState({
          projectdescription: "",
          projectname: ""
        });
      })
      .catch(err => {
        alert(err);
      });
  };
  validate = e => {
    e.preventDefault();
    var pname = document.forms["RegForm"]["projectname"];
    var pdesc = document.forms["RegForm"]["projectdescription"];
    var x = true;
    if (pname.value === "") {
      pname.focus();
      x = false;
    } else if (pdesc.value === "") {
      pdesc.focus();
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
      <form name="RegForm">
        <div className="er">
          <legend>Project information</legend>
          <div className="form-group">
            <label htmlFor="projectname">Project Name:</label>
            <input
              type="text"
              id="projectname"
              name="projectname"
              className="form-control"
              placeholder="Projectname"
              required
              value={this.state.projectname}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectdescription">Project Description:</label>
            <textarea
              rows="8"
              className="form-control"
              name="projectdescription"
              placeholder="Projectdescription"
              value={this.state.projectdescription}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <br />
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary"
          onClick={this.validate}
        />
      </form>
    );
  }
}

export default Addproject;
