import React, { Component } from "react";

class Showprojects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.proj
    };
  }
  render() {
    var xx = [];
    if (this.state.projects !== undefined) {
      xx = this.props.proj.map((x, i) => {
        return (
          <>
            <div className="card  " key={i}>
              <div className="card-header">
                <a
                  className="collapsed card-link"
                  data-toggle="collapse"
                  href={`${"#collapse" + i}`}
                >
                  {x.Projectname}
                </a>
              </div>
              <div
                id={`${"collapse" + i}`}
                className="collapse "
                data-parent="#accordion"
              >
                <div className="card-body">
                  <table className="table table-responsive-md">
                    <tr>
                      <td>Assigned to</td>
                      <td>{x.Assignedto}</td>
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
                      <td>Description</td>
                      <td>{x.Description}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{x.Status}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      });
    }

    return (
      <>
        <h1>Releated Projects</h1>
        <div id="accordion">{xx}</div>
        <br />
      </>
    );
  }
}

export default Showprojects;
