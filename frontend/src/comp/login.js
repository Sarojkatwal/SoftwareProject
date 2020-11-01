import React, { Component } from "react";
import "./login.css";
import I1 from "./pictures/i1.jpg";
import I2 from "./pictures/i2.jpg";
import I3 from "./pictures/i3.jpg";
import I4 from "./pictures/i4.jpg";
import I5 from "./pictures/i5.jpg";
import I6 from "./pictures/i6.jpg";
import LICT from "./pictures/lict.jpg";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      matched: "notmatched",
      Height: window.innerHeight,
      Width: window.innerWidth,
      loader: false,
    };
  }
  componentDidMount() {
    this.lstner = setInterval(
      () => window.addEventListener("resize", this.handleResize),
      500
    );
  }
  handleResize = () => {
    this.setState({
      ...this.state,
      Height: window.innerHeight,
      Width: window.innerWidth,
    });
  };
  handleInputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const obj = {
      UserName: this.state.username,
      Password: this.state.password,
    };
    axios
      .post("/checkuser.php", obj)
      .then((res) => {
        this.setState({ ...this.state, matched: res.data });
        if (
          this.state.matched === "matchedasintern" ||
          this.state.matched === "matchedasadmin"
        ) {
          sessionStorage.setItem("username", this.state.username);
          sessionStorage.setItem("loggedin", "true");
          sessionStorage.setItem("type", this.state.matched);
          this.setState({ ...this.state, loader: true });
          setTimeout(() => {
            this.setState({
              ...this.state,
              loader: false,
            });
            this.props.history.push("/ihomepage");
          }, 3000);
        } else {
          alert("Insert correct username and password!!!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  componentWillUnmount() {
    clearInterval(this.lstner);
  }
  render() {
    return (
      <React.Fragment>
        <div id="demo" className="carousel slide" data-ride="carousel">
          <ul className="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" className="active" />
            <li data-target="#demo" data-slide-to="1" />
            <li data-target="#demo" data-slide-to="2" />
            <li data-target="#demo" data-slide-to="3" />
            <li data-target="#demo" data-slide-to="4" />
            <li data-target="#demo" data-slide-to="5" />
          </ul>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={I1}
                alt={I2}
                style={{ height: this.state.Height, width: this.state.Width }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={I2}
                alt={I3}
                style={{ height: this.state.Height, width: this.state.Width }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={I3}
                alt={I4}
                style={{ height: this.state.Height, width: this.state.Width }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={I4}
                alt={I5}
                style={{ height: this.state.Height, width: this.state.Width }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={I5}
                alt={I6}
                style={{ height: this.state.Height, width: this.state.Width }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={I6}
                alt={I1}
                style={{ height: this.state.Height, width: this.state.Width }}
              />
            </div>
          </div>
          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>

        <div className="container">
          <div id="frontpage">
            <img
              src={LICT}
              alt={LICT}
              className="rounded-circle"
              width="200px"
            />
            <h1 className="font-weight-bolder" style={{ color: "red" }}>
              LICT Intern
            </h1>
            <h1 className="font-weight-bolder" style={{ color: "red" }}>
              Management
            </h1>
            <button
              type="button"
              className="btn-lg btn-primary"
              data-toggle="modal"
              data-target="#myModal"
            >
              {this.state.loader ? (
                <div>
                  <i className="fa fa-spinner fa-spin"> </i>
                  <b>&nbsp;Logging in</b>
                </div>
              ) : (
                <b>Login</b>
              )}
            </button>
          </div>
        </div>
        <div id="myModal" className="modal fade ">
          <div className="modal-dialog modal-login">
            <div className="modal-content" style={{ borderRadius: "10%" }}>
              <div className="modal-header">
                <h4 className="modal-title">Sign In</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body ">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon form-control">
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      required="required"
                      placeholder="Username"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon form-control">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      required="required"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-lg"
                    onClick={this.handleSubmit}
                    data-dismiss="modal"
                  >
                    Sign In
                  </button>
                </div>
                <p className="hint-text">
                  <a
                    href="#"
                    onClick={() => {
                      return alert("Contact Admin Pannel");
                    }}
                  >
                    Forgot Password?
                  </a>
                </p>
              </div>
              <div className="modal-footer text-danger">
                LICT INTERN MANAGEMENT
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
