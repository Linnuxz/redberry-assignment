import TaskColumn from "./TaskColumn.tsx";
import { TaskStatusType, TaskType } from "../types";

interface BoardProps {
  statuses: TaskStatusType[];
  tasks: TaskType[] | null;
}

const Board = ({ statuses, tasks }: BoardProps) => {
  return (
    <div className="flex gap-[52px]">
      {statuses?.map((stat) => (
        <TaskColumn
          key={stat.id}
          id={stat.id}
          name={stat.name}
          tasks={tasks?.filter((task) => task.status.id === stat.id) || []}
        />
      ))}
    </div>
  );
};

export default Board;
