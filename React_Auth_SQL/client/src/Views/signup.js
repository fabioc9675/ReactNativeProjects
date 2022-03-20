import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "", // database message
      request: "", // database request
    };

    // Associate events with the component
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // calling of endpoint
    axios
      .get("http://localhost:4000/signup")
      .then((response) => {
        this.setState({ message: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleClick() {
    const jsonPipe = JSON.stringify({ user: "Fabian", password: "test12345" });
    console.log(jsonPipe);

    // calling of endpoint
    axios
      .post("http://localhost:4000/signup", jsonPipe, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ request: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <h2>{this.state.message}</h2>
        <button
          className="ui primary button basic"
          onClick={() => this.handleClick()}
        >
          Send request
        </button>
        <h2>{this.state.request}</h2>
      </div>
    );
  }
}

export default SignUp;
