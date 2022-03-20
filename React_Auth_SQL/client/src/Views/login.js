import axios from "axios";
import React, { useEffect, useState } from "react";

export default function LogIn() {
  const [message, setMessage] = useState();
  const [request, setRequest] = useState();

  useEffect(() => {
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
      username: "FabianLogin",
      password: "test12345",
    });
    console.log(jsonPipe);

    // calling of endpoint

    logPost(jsonPipe)
      .then((response) => {
        setRequest(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
    <div>
      <h1>Log In</h1>
      <h2>{message}</h2>
      <button className="ui primary button basic" onClick={handleClick}>
        Send request
      </button>
      <h2>{request}</h2>
    </div>
  );
}
