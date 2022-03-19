import React from "react";
import { useNavigate } from "react-router";

import TaskList from "../Components/taskList";

export default function Home() {
  // URL history
  const navigate = useNavigate();
  // function to navigate to smoothies
  function handleClick() {
    navigate("/smoothies");
  }

  return (
    <div>
      <div>Hi, I am Home</div>
      <TaskList />
      <div>
        <button className="ui primary button basic" onClick={handleClick}>
          Go Smoothies
        </button>
      </div>
    </div>
  );
}
