import React, { Component } from "react";
import axios from "axios";
import Showprojects from "../components/Forshowinterns/showprojects";
import Showpersonalinfo from "../components/Forshowinterns/showpersonalinfo";

class Showinterns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spintern: {},
      allprojects: [],
      loading: true
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata = async () => {
    const username = sessionStorage.getItem("username");
    const sql1 =
      "SELECT * FROM  internsdetail WHERE Username='" + username + "'";
    const sql2 =
      "SELECT * FROM projectdetail WHERE Assignedto LIKE '%" +
      username +
      "%' AND Status NOT IN('Completed')";
    let res1 = await axios.post("/fetchinfo.php", sql1);
    let res2 = await axios.post("/fetchallprojects.php", sql2);
    this.setState({
      ...this.state,
      allprojects: res2.data,
      spintern: res1.data[0],
      loading: false
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  render() {
    console.log(this.state);
    const xx = (
      <>
        <Showpersonalinfo dat={this.state.spintern} />
        <Showprojects proj={this.state.allprojects} />
      </>
    );
    return <>{!this.state.loading && xx}</>;
  }
}

export default Showinterns;
