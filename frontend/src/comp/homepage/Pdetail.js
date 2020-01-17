import React, { Component } from "react";
import axios from "axios";

class Pdetail extends Component {
  constructor(props) {
    super(props);
    this.state = { intern: [] };
  }
  componentDidMount() {
    axios
      .get("/fetchinfo.php")
      .then(res => {
        this.setState({ intern: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }
  userList() {
    return this.state.intern.map((x, i) => {
      return (
        <p key={i}>
          <li>{x.Id}</li>
          <li>{x.Name}</li>
          <li>{x.ProjectName}</li>
          <li>{x.EndDate}</li>
          <li>{x.Address}</li>
        </p>
      );
    });
  }
  render() {
    return <div className="Options">{this.userList()}</div>;
  }
}

export default Pdetail;
