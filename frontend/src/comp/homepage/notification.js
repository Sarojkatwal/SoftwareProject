import React, { Component } from "react";
import axios from "axios";
export class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allnotifications: [],
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata() {
    axios
      .get("/notification.php")
      .then((res) => {
        if (res.data !== undefined) {
          console.log(res.data);
          this.setState({
            allnotifications: res.data,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    const xx = "";
    console.log("Saroj", this.state.notification);
    /*const xx = this.state.allnotifications.map((x, i) => {
      return (
        <tr key={i}>
          <td>
            {i + 1}.{x.By}&nbsp;{x.Action} &nbsp; on &nbsp; {x.Date}
          </td>
        </tr>
      );
    });*/
    return (
      <>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
          style={{ float: "right" }}
        >
          Notifications{" "}
          <span class="badge badge-danger">
            <i class="fa fa-circle" aria-hidden="true"></i>
          </span>
        </button>

        <div class="modal fade" id="myModal">
          <div class="modal-dialog modal-md">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">
                  <b>Notifications</b>
                </h4>
              </div>
              <div class="modal-body">
                <table className="table table-hover">
                  <tbody>
                    <thead>Hello</thead>
                  </tbody>
                </table>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Notification;
