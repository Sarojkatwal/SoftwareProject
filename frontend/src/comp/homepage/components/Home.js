import React, { Component } from "react";
import axios from "axios";
import Im from "./welcome.jpg";
class Home extends Component {
  componentDidMount() {
    this.loaddata();
    var canvas = document.getElementById("mycanvas");
    this.ctx = canvas.getContext("2d");
    this.rad = canvas.height / 2;
    this.ctx.translate(this.rad, this.rad);
    this.rad = this.rad * 0.9;
    setInterval(this.drawClock, 100);
  }

  loaddata() {
    const ownid = sessionStorage.getItem("username");
    const sql =
      "SELECT * FROM  internsdetail i RIGHT JOIN internuser iu ON i.Uid=iu.Uid WHERE Username ='" +
      ownid +
      "'";
    axios
      .post("/fetchinfo.php", sql)
      .then((res) => {
        if (res.data !== undefined) {
          //console.log(res.data);
          sessionStorage.setItem("uid", res.data[0].Uid);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  drawClock = () => {
    this.drawFace();
    this.drawNumber();
    this.drawTime();
  };
  drawFace = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(0, 0, this.rad, 0, 2 * Math.PI);
    this.ctx.fill();
    var grd = this.ctx.createRadialGradient(
      0,
      0,
      0.95 * this.rad,
      0,
      0,
      this.rad * 1.05
    );
    grd.addColorStop(0, "green");
    grd.addColorStop(0.5, "white");
    grd.addColorStop(1, "white");
    this.ctx.lineWidth = this.rad * 0.1;
    this.ctx.strokeStyle = grd;
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(0, 0, 0.1 * this.rad, 0, 2 * Math.PI);
    this.ctx.fill();
  };
  drawNumber = () => {
    var num;
    var ang;
    this.ctx.font = "10px Arial";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      this.ctx.rotate(ang);
      this.ctx.translate(0, -this.rad * 0.85);
      this.ctx.rotate(-ang);
      this.ctx.fillText(num, 0, 0);
      this.ctx.rotate(ang);
      this.ctx.translate(0, this.rad * 0.85);
      this.ctx.rotate(-ang);
    }
  };
  drawTime = () => {
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    hour = hour % 12;
    hour =
      (hour * Math.PI) / 6 +
      (min * Math.PI) / (6 * 60) +
      (sec * Math.PI) / (6 * 60 * 60);
    this.drawHand(this.ctx, hour, 0.5 * this.rad, 0.09 * this.rad);
    min = (min * Math.PI) / 30 + (sec * Math.PI) / (30 * 60);
    this.drawHand(this.ctx, min, 0.8 * this.rad, 0.06 * this.rad);
    sec = (sec * Math.PI) / 30;
    this.drawHand(this.ctx, sec, 0.86 * this.rad, 0.03 * this.rad);
  };
  drawHand = (ctx, ang, len, wid) => {
    ctx.beginPath();
    ctx.lineWidth = wid;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(ang);
    ctx.lineTo(0, -len);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.rotate(-ang);
  };
  render() {
    return (
      <div className="container">
        <div className="d-block border border-primary float-right">
          <canvas
            id="mycanvas"
            width="150"
            height="150"
            style={{
              backgroundColor: "white",
            }}
          />
        </div>
        <div class="container">
          <img src={Im} class="img-rounded" height="80%" width="100%" />
        </div>
      </div>
    );
  }
}

export default Home;
