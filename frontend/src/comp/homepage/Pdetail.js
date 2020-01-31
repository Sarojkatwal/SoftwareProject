import React, { Component } from "react";
import axios from "axios";
import "./Pdetail.css";

class Pdetail extends Component {
  constructor(props) {
    super(props);
    this.state = { intern: [], loading: true };
    //console.log(auth.getUsername(), " ", auth.isAuthenticated());
  }
  componentDidMount() {
    const username = sessionStorage.getItem("username");
    setTimeout(() => {
      axios
        .post("/fetchinfo.php", username)
        .then(res => {
          this.setState({ intern: res.data, loading: false });
        })
        .catch(err => {
          console.error(err);
        });
    }, 3000);
  }
  userList() {
    return this.state.intern.map((x, i) => {
      return this.state.loading ? (
        <i class="fa fa-refresh fa-spin"></i>
      ) : (
        <div className="container pdetail" style={{}}>
          <p key={i}>
            Id:<li>{x.Id}</li>
            Name<li>{x.Name}</li>
            ProjectName<li>{x.ProjectName}</li>
            AssignedDate<li>{x.AssignedDate}</li>
            EndDate<li>{x.EndDate}</li>
            Address<li>{x.Address}</li>
          </p>
        </div>
      );
    });
  }
  render() {
    return <div className="Options">{this.userList()}</div>;
  }
}

export default Pdetail;
