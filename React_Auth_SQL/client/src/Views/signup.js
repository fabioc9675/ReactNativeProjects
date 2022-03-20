import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "", // database message
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

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default SignUp;
