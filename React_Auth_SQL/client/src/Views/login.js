import axios from "axios";
import React, { useEffect, useState } from "react";

export default function LogIn() {
  const [message, setMessage] = useState();

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

  return (
    <div>
      <h1>Log In</h1>
      <h2>{message}</h2>
    </div>
  );
}
