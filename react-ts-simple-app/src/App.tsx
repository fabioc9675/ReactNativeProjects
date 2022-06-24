import { useState } from "react";
import "./App.css";

interface Props {
  // permite crear un tipo de dato para controlar la entrada a App
  title: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function App({ title }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    // <> dentro de ese simbolo se dice que estamos pasando un arreglo de tareas deacuerdo a la interface creada
    {
      id: 1,
      title: "Learn React",
      description: "Learn React",
      completed: false,
    },
  ]);

  return (
    <div className="App">
      <h1>{title}</h1>

      {tasks.map((task) => (
        <div>
          <h2>{task.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
