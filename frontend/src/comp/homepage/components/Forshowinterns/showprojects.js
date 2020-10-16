import React, { Component } from "react";

class Showprojects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.proj,
    };
  }
  render() {
    var xx = [];
    if (this.state.projects !== undefined && this.state.projects.length !== 0) {
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
        <h1>Related Projects</h1>
        <div id="accordion">{xx}</div>
        <br />
      </>
    );
  }
}

export default Showprojects;
