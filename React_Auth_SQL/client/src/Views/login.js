import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

export default function LogIn() {
  const [message, setMessage] = useState();
  const [request, setRequest] = useState();
  const [username, setUsername] = useState();
  const [userpass, setUserpass] = useState();
  const [usermail, setUsermail] = useState();

  useEffect(() => {
    // console.log("component was mounted");
    const socket = io("http://localhost:4000", {
      transports: ["websocket", "polling", "flashsocket"], // adding permissions to socket
    });

    // initialization of socket io in client side
    socket.on("logMessage", (message) => {
      console.log(message);

      toast(message.toString());
    });

    axios
      .get("http://localhost:4000/login")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleClick() {
    const jsonPipe = JSON.stringify({
      USER_NAME: username,
      USER_PASS: userpass,
      USER_TOKEN: "thisIsAToken",
      USER_MAIL: usermail,
    });
    console.log(jsonPipe);

    // calling of endpoint

    logPost(jsonPipe)
      .then((response) => {
        setRequest(response.data);
      })
      .catch((error) => {
        console.error(error);
        setRequest(
          error.USER_NAME + ":" + error.USER_PASS + ":" + error.USER_MAIL
        );
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  // async function to make the request to the database
  async function logPost(jsonData) {
    const response = await axios.post("http://localhost:4000/login", jsonData, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  return (
    <div className="ui raised very padded text container segment">
      <form className="ui form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Log In Form</h1>
        <div className="ui left icon input">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
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
            value={usermail}
            onChange={(e) => {
              setUsermail(e.target.value);
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
            value={userpass}
            onChange={(e) => {
              setUserpass(e.target.value);
            }}
          ></input>
          <i className="key icon"></i>
        </div>
        <div className="ui divider"></div>
        <h4>{message}</h4>

        <button
          className="ui primary button basic"
          onClick={() => handleClick()}
        >
          Send request
        </button>
        <h4>{request}</h4>
      </form>
      <ToastContainer />
    </div>
  );
}
