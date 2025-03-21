import { useParams } from "react-router-dom";
import { TaskType } from "../types";
import { useEffect, useState } from "react";
import { fetchTaskById } from "../api/api.ts";

const OpenTask = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState<TaskType | null>(null);

  useEffect(() => {
    fetchTaskById(Number(id))
      .then((data) => {
        setTaskData(data);
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
  }, [id]);

  return <div className="mt-[40px]">{taskData?.name}</div>;
};

export default OpenTask;
