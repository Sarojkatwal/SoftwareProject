import React, { Component } from "react";
import axios from "axios";

class Showmessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.dat.Username,
      currentmessage: "",
      allmessages: []
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    axios
      .post("/fetchmessage.php", this.state.username)
      .then(res => {
        //console.log(res.data);
        if (res.data !== undefined) {
          this.setState({
            ...this.state,
            allmessages: res.data
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
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.currentmessage === "") {
      document.getElementById("a11").focus();
      return;
    }
    const obj = {
      by: sessionStorage.getItem("username"),
      to: this.state.username,
      message: this.state.currentmessage
    };
    const sql =
      "INSERT INTO message (`By.`, `Message.`, `To.`) VALUES ('" +
      obj.by +
      "','" +
      obj.message +
      "','" +
      obj.to +
      "')";
    axios
      .post("/store.php", sql)
      .then(res => {
        alert(res.data);
        this.setState({
          ...this.state,
          currentmessage: ""
        });
        this.loaddata();
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    const xx = this.state.allmessages.map((message, i) => {
      var classname;
      if (message.By === this.state.username) {
        classname = "homemessage";
      } else {
        classname = " awaymessage";
      }
      return (
        <div
          className={classname}
          key={i}
          style={{ marginBottom: "23px", position: "relative" }}
        >
          <small>{message.By + "(" + message.Date + ")"}</small>
          <div className="a2">{message.Message}</div>
        </div>
      );
    });
    return (
      <div>
        <div class="input-group mb-3">
          <input
            type="text"
            name="currentmessage"
            class="form-control"
            placeholder="Write message"
            id="a11"
            value={this.state.currentmessage}
            onChange={this.handleInputChange}
          />
          <div class="input-group-append">
            <button
              class="btn btn-success"
              type="submit"
              onClick={this.handleSubmit}
            >
              Send
            </button>
          </div>
          <div class="input-group-append">
            <button
              class="btn btn-danger"
              type="submit"
              onClick={this.props.action}
            >
              Goback
            </button>
          </div>
          <br />
        </div>
        {xx}
      </div>
    );
  }
}

export default Showmessage;
