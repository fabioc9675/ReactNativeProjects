import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        {/* Navigationn */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="barnd-logo" href="/">
              MERN Stack
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col 5s">
              <div className="card">
                <div className="card-content">
                  <form>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Task Title"></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          className="materialize-textarea"
                          placeholder="Task Description"
                        ></textarea>
                      </div>
                    </div>
                    <button className="btn light-blue darken-4" type="submit">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
