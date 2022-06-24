import { Task } from "../interfaces/Task";

interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  return (
    <div className="card card-body bg-secondary rounded-0 text-dark">
      <h2>{task.title}</h2>
      <p>{task.id}</p>
      <p>{task.description}</p>
      <button className="btn btn-danger">Delete</button>
    </div>
  );
}

export default TaskCard;
