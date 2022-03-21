import React, { Component } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
    // console.log("component was mounted");
    const socket = io("http://localhost:4000", {
      transports: ["websocket", "polling", "flashsocket"], // adding permissions to socket
    });

    // initialization of socket io in client side
    socket.on("message", (message) => {
      console.log(message);

      toast(message.toString());
    });

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
    const jsonPipe = JSON.stringify({
      USER_NAME: "Felipe",
      USER_PASS: "trest345",
      USER_TOKEN: "thisIsAToken",
      USER_MAIL: "thisisanemal@email.com",
    });
    console.log(jsonPipe);

    // calling of endpoint

    this.signPost(jsonPipe)
      .then((response) => {
        this.setState({ request: response.data });
      })
      .catch((error) => {
        this.setState({
          request:
            error.USER_NAME + ":" + error.USER_PASS + ":" + error.USER_MAIL,
        });
        // console.error(error);
      });
  }

  // async function to make the request to the database
  async signPost(jsonData) {
    const response = await axios.post(
      "http://localhost:4000/signup",
      jsonData,
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );

    return response;
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
        <ToastContainer />
      </div>
    );
  }
}

export default SignUp;
