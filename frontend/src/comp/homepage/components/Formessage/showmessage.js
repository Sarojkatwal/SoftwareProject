import React, { Component } from "react";
import axios from "axios";

class Showmessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      by: sessionStorage.getItem("uid"),
      uid: this.props.dat.Uid,
      currentmessage: "",
      allmessages: [],
      loaded: false,
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    const obj = {
      by: this.state.by,
      to: this.state.uid,
    };
    axios
      .post("/fetchmessage.php", obj)
      .then((res) => {
        //console.log(res.data);
        if (res.data !== undefined) {
          this.setState({
            ...this.state,
            allmessages: res.data,
            loaded: true,
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
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.currentmessage === "") {
      document.getElementById("a11").focus();
      return;
    }
    if (sessionStorage.getItem("uid") === undefined) {
      alert("Sth went wrong");
      return;
    }
    const sql =
      "INSERT INTO message (`By.`, `Message`, `To.`) VALUES ('" +
      this.state.by +
      "','" +
      this.state.currentmessage +
      "','" +
      this.state.uid +
      "')";
    //alert(typeof sessionStorage.getItem("uid"));
    axios
      .post("/store.php", { sqls: [sql] })
      .then((res) => {
        //alert(res.data);
        this.setState({
          ...this.state,
          currentmessage: "",
        });
        this.loaddata();
      })
      .catch((err) => {
        alert(err);
      });
  };
  render() {
    //console.log(this.state.allmessages);
    const xx = this.state.allmessages.map((message, i) => {
      var classname;
      message.By === this.state.uid
        ? (classname = "homemessage")
        : (classname = "awaymessage");

      return (
        <div className={classname} key={i}>
          <div className="a2">
            {message.Message}
            <br />
            <small>{message.By + "(" + message.Date + ")"}</small>
          </div>
        </div>
      );
    });
    return this.state.loaded ? (
      <div>
        <button
          class="btn btn-danger"
          type="submit"
          onClick={this.props.action}
        >
          Goback
        </button>
        <h5 className="float-right">{this.props.dat.Username}</h5>
        <br />
        <br />
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
          <br />
        </div>
        {xx}
      </div>
    ) : (
      <div className="container">
        <span className="spinner-border text-success mx-auto d-block" />
      </div>
    );
  }
}

export default Showmessage;
