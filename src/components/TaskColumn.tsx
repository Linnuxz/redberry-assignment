import { TaskType } from "../types";
import Task from "./Task.tsx";

interface ColumnListProps {
  id?: number;
  name?: string;
  tasks?: TaskType[];
}

const TaskColumn = ({ id, name, tasks }: ColumnListProps) => {
  const primaryColor =
    id === 1
      ? "#F7BC30"
      : id === 2
        ? "#FB5607"
        : id === 3
          ? "#FF006E"
          : "#3A86FF";

  return (
    <div className="flex flex-col gap-7.5">
      <div
        className="flex w-[381px] items-center justify-center rounded-[10px]"
        style={{ backgroundColor: primaryColor }}
      >
        <h2 className={`my-[15px] text-[20px] text-white`}>{name}</h2>
      </div>
      <div className="flex flex-col gap-10">
        {tasks?.map((task) => (
          <Task key={task.id} task={task} primaryColor={primaryColor} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
