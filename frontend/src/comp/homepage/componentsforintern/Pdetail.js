import React, { Component } from "react";
import axios from "axios";
import Showprojects from "../components/Forshowinterns/showprojects";
import Showpersonalinfo from "../components/Forshowinterns/showpersonalinfo";
import Edit from "../components/Forshowinterns/edit";
import FillInfo from "./fillYourInfo";

class Showinterns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spintern: {},
      loading: true,
      detreport: 1,
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata = async () => {
    const username = sessionStorage.getItem("username");
    const sql1 =
      "SELECT * FROM  internsdetail i  RIGHT JOIN internuser iu ON i.Uid=iu.Uid WHERE Username='" +
      username +
      "'";
    axios.post("/fetchinfo.php", sql1).then((res1) => {
      if (res1.data[0].Firstname !== null) {
        console.log(res1.data);
        this.setState({
          ...this.state,
          spintern: res1.data[0],
          detreport: 1,
          loading: false,
        });
      } else {
        this.setState({
          ...this.state,
          spintern: res1.data[0],
          loading: false,
          detreport: 0,
        });
      }
    });
  };

  editDetails = () => {
    this.setState({
      ...this.state,
      detreport: 2,
    });
  };

  handler = () => {
    this.loaddata();
  };
  handler1 = () => {
    this.setState({
      ...this.state,
      detreport: 1,
    });
  };
  render() {
    const xx = (
      <>
        <Showpersonalinfo dat={this.state.spintern} />
      </>
    );
    return (
      <>
        {this.state.detreport == 1 ? (
          !this.state.loading && (
            <>
              {xx}
              <button
                className="btn btn-success float-right"
                onClick={this.editDetails}
              >
                Edit details
              </button>
            </>
          )
        ) : this.state.detreport == 2 ? (
          <Edit
            {...this.props}
            dat={this.state.spintern}
            action1={this.handler1}
            action2={this.handler}
          />
        ) : (
          <FillInfo
            {...this.props}
            dat={this.state.spintern}
            action={this.handler}
          />
        )}
      </>
    );
  }
}

export default Showinterns;
