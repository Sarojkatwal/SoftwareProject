import React, { Component } from "react";
import Showmessage from "../components/Formessage/showmessage.js";
class Chatbox extends Component {
  render() {
    const data = { Username: sessionStorage.getItem("username") };
    return (
      <div>
        <Showmessage dat={data} />
      </div>
    );
  }
}

export default Chatbox;
