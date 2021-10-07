import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
    };

    // associate events to the functions in the class
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTask(e) {
    console.log(this.state);
    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target; //obtain form e.target just name and value
    this.setState({
      [name]: value,
    });
  }

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
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          type="text"
                          placeholder="Task Title"
                          onChange={this.handleChange}
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          className="materialize-textarea"
                          placeholder="Task Description"
                          onChange={this.handleChange}
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
