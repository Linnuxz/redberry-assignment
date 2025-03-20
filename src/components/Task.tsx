import { CommentType, TaskType } from "../types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ka } from "date-fns/locale/ka";

import Comments from "../assets/Comments.svg";
import { fetchCommentsByTaskId } from "../api/api.ts";

interface TaskProps {
  task: TaskType;
  primaryColor: string;
}

const Task = ({ task, primaryColor }: TaskProps) => {
  const [shortenedDepartment, setShortenedDepartment] = useState<string | null>(
    null,
  );

  const [comments, setComments] = useState<CommentType[]>([]);

  const formattedDate = format(task.due_date, "dd MMM, yyyy", { locale: ka });

  const priorityColor =
    task.priority.id === 1
      ? "#08A508"
      : task.priority.id === 2
        ? "#FFBE0B"
        : "#FA4D4D";

  useEffect(() => {
    switch (task.department.id) {
      case 1:
        setShortenedDepartment("Administration");
        break;
      case 2:
        setShortenedDepartment("HR");
        break;
      case 3:
        setShortenedDepartment("ფინანსები");
        break;
      case 4:
        setShortenedDepartment("მარკეტინგი");
        break;
      case 5:
        setShortenedDepartment("ლოჯისტიკა");
        break;
      case 6:
        setShortenedDepartment("ინფ. ტექ.");
        break;
      case 7:
        setShortenedDepartment("მედია");
        break;
      default:
        setShortenedDepartment(null);
        break;
    }
  }, [task.department.id]);

  const departmentColors = ["#FF66A8", "#FD9A6A", "#89B6FF", "#FFD86D"];

  const departmentIndex = (task.department.id - 1) % departmentColors.length;
  const departmentColor = departmentColors[departmentIndex];

  useEffect(() => {
    const fetchTaskComments = async () => {
      try {
        const commentsData = await fetchCommentsByTaskId(task.id);
        setComments(commentsData);
      } catch (error) {
        console.error(`Error fetching comments for task ${task.id}:`, error);
      }
    };

    fetchTaskComments();

    const interval = setInterval(fetchTaskComments, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      key={task.id}
      className="flex flex-col gap-7 rounded-[15px] border px-5 py-5"
      style={{ borderColor: primaryColor }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="inline-flex items-center justify-center gap-1 rounded-[5px] border px-1 py-1"
            style={{ color: priorityColor, borderColor: priorityColor }}
          >
            <img src={task.priority.icon} alt="icon" />
            <p>{task.priority.name}</p>
          </div>
          <div
            className="flex h-[30px] items-center justify-center rounded-2xl px-[9px] text-xs text-white"
            style={{ backgroundColor: departmentColor }}
          >
            {shortenedDepartment}
          </div>
        </div>
        <div className="text-xs text-nowrap">{formattedDate}</div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[15px] font-medium">
          {task.name}
          <br />
        </p>
        <p className="text-[14px] font-normal">
          {task.description}
          <br />
        </p>
      </div>

      <div className="flex items-center justify-between">
        <img
          className="h-[31px] w-[31px] rounded-full"
          src={task.employee.avatar}
          alt="employee_avatar"
        />
        <button className="flex items-center justify-center gap-1">
          <img src={Comments} alt="comment-icon" />
          <p className="text-[14px]">{comments.length}</p>
        </button>
      </div>
    </div>
  );
};

export default Task;
