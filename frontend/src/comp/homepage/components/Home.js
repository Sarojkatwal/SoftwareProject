import React, { Component } from "react";
import Bg from "../../pictures/bg.jpg";

class Home extends Component {
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
