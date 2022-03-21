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
      username: "",
      userpass: "",
      usermail: "",
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
    socket.on("signMessage", (message) => {
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
      USER_NAME: this.state.username,
      USER_PASS: this.state.userpass,
      USER_TOKEN: "thisIsAToken",
      USER_MAIL: this.state.usermail,
    });
    console.log(jsonPipe);

    // calling of endpoint

    this.signPost(jsonPipe)
      .then((response) => {
        this.setState({
          request: response.data,
          username: "",
          userpass: "",
          usermail: "",
        });
      })
      .catch((error) => {
        this.setState({
          request:
            error.USER_NAME + ":" + error.USER_PASS + ":" + error.USER_MAIL,
        });
        // console.error(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
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
      <div className="ui raised very padded text container segment">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <h1>Sign Up Form</h1>
          <div className="ui left icon input">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            ></input>
            <i className="users icon"></i>
          </div>
          <div className="ui divider"></div>
          <div className="ui left icon input">
            <input
              type="email"
              name="usermail"
              placeholder="Email"
              value={this.state.usermail}
              onChange={(e) => {
                this.setState({ usermail: e.target.value });
              }}
            ></input>
            <i className="mail icon"></i>
          </div>
          <div className="ui divider"></div>
          <div className="ui left icon input">
            <input
              type="password"
              name="userpass"
              placeholder="Password"
              value={this.state.userpass}
              onChange={(e) => {
                this.setState({ userpass: e.target.value });
              }}
            ></input>
            <i className="key icon"></i>
          </div>
          <div className="ui divider"></div>
          <h4>{this.state.message}</h4>

          <button
            className="ui primary button basic"
            onClick={() => this.handleClick()}
          >
            Send request
          </button>
          <h4>{this.state.request}</h4>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default SignUp;
