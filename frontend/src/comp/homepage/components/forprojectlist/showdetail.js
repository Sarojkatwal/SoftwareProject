import React, { Component } from "react";

class Showdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.dat.Pid,
      projectname: this.props.dat.Projectname,
      description: this.props.dat.Description,
      status: this.props.dat.Status,
      githublink: this.props.dat.Githublink,
      Udata: this.props.dat.Udata,
    };
  }

  render() {
    var xx = [];
    if (
      this.state.Udata !== undefined &&
      this.state.Udata.length !== 0 &&
      this.state.status !== "Notassigned"
    ) {
      xx = this.state.Udata.map((x, i) => {
        return (
          <>
            <div className="card  " key={i}>
              <div className="card-header">
                <a
                  className="collapsed card-link"
                  data-toggle="collapse"
                  href={`${"#collapse" + i}`}
                >
                  {`InternNo ${i+1}`}
                </a>
                <span
                  className={`${
                    x.UPstatus == "active"
                      ? "badge badge-pill badge-success float-right"
                      : "badge badge-pill badge-secondary float-right"
                  }`}
                >
                  {x.UPstatus[0]}
                </span>
              </div>
              <div
                id={`${"collapse" + i}`}
                className="collapse "
                data-parent="#accordion"
              >
                <div className="card-body">
                  <table className="table table-responsive-md">
                    <tr>
                      <td>Uid</td>
                      <td>{x.Uid}</td>
                    </tr>
                    <tr>
                      <td>Username</td>
                      <td>{x.Username.toString()}</td>
                    </tr>
                    <tr>
                      <td>Assigneddate</td>
                      <td>{x.Assigneddate}</td>
                    </tr>
                    <tr>
                      <td>Enddate</td>
                      <td>{x.Enddate}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{x.UPstatus}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      });
    } else {
      xx = <div>No projects to show</div>;
    }
    return (
      <>
        <h1>Details</h1>
        <table className="table table-hover  table-responsive-lg">
          <tbody style={{ textAlign: "left" }}>
            <tr>
              <td>Pid</td>
              <td>{this.state.pid}</td>
            </tr>
            <tr>
              <td>Projectname</td>
              <td>{this.state.projectname}</td>
            </tr>

            <tr>
              <td>Status</td>
              <td>{this.state.status}</td>
            </tr>
            {this.state.status === "Completed" && (
              <tr>
                <td>Githublink</td>
                <td>
                  <a>{this.state.Githublink}</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div class="panel-group border border-left-0 border-right-0 container">
          <div class="panel panel-default border border-left-0 border-right-0 ">
            <div class="panel-heading">
              <h5 class="panel-title">
                <a
                  data-toggle="collapse"
                  href="#collapse11"
                  style={{ color: "black" }}
                >
                  Description
                </a>
              </h5>
            </div>
            <div id="collapse11" class="panel-collapse collapse">
              <div class="panel-body">{this.state.description}</div>
            </div>
          </div>
        </div>
        <br />

        {this.state.status !== "Notassigned" && (
          <div id="accordion">
            <h3>Interns Assigned </h3>
            {xx}
          </div>
        )}
        <input
          type="submit"
          className="btn btn-primary mt-3"
          value="Goback"
          onClick={this.props.action}
        />
      </>
    );
  }
}

export default Showdetail;
