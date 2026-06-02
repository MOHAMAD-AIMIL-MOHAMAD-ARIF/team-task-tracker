import type { TaskItem } from "../../types/task";
import TaskListItem from "./TaskListItem";

type TaskListProps = {
  tasks: TaskItem[];
};

function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;