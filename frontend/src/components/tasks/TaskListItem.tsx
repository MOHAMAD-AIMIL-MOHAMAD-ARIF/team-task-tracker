import { Link } from "react-router-dom";
import Card from "../ui/Card";
import type { TaskItem } from "../../types/task";

type TaskListItemProps = {
  task: TaskItem;
};

function TaskListItem({ task }: TaskListItemProps) {
  return (
    <Link to={`/tasks/${task.id}`}>
      <Card>
        <h2>{task.title}</h2>
        {task.description ? <p>{task.description}</p> : null}
        <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
      </Card>
    </Link>
  );
}

export default TaskListItem;