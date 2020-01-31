import React, { Component } from "react";
import Bg from "./bg.jpg";
import "./ihomepage.css";

class Home extends Component {
  constructor() {
    super();
    console.log("Hello from  constructor Home.js");
  }
  render() {
    return (
      <div className="Options">
        <img
          src={Bg}
          alt={Bg}
          width="100%"
          height="457px"
          style={{ opacity: "0.7" }}
        />
      </div>
    );
  }
}

export default Home;
