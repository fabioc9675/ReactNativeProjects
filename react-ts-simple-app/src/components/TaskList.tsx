import { Task } from "../interfaces/Task";

interface Props {
  tasks: Task[];
}

function TaskList({ tasks }: Props) {
  return (
    <>
      {/* Como estoy importanto una lista, un array, debo hacerlo dentro de un fragmento <></>*/}
      {tasks.map((task) => (
        <div>
          <h2>{task.title}</h2>
        </div>
      ))}
    </>
  );
}

export default TaskList;
