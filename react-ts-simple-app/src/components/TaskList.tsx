import { Task } from "../interfaces/Task";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
}

function TaskList({ tasks }: Props) {
  return (
    <>
      {/* Como estoy importanto una lista, un array, debo hacerlo dentro de un fragmento <></>*/}
      {tasks.map((task) => (
        <div className="col-md-4 pb-2">
          <TaskCard task={task} />
        </div>
      ))}
    </>
  );
}

export default TaskList;
