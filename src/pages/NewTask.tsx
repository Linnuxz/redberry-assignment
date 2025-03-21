import Input from "../components/Input.tsx";
import { useEffect, useState } from "react";
import {
  DepartmentType,
  EmployeeType,
  PriorityType,
  TaskStatusType,
  TaskType,
} from "../types";

const NewTask = () => {
  const [taskData, setTaskData] = useState<TaskType>({
    id: 0,
    name: "",
    description: "",
    due_date: "",
    status: { id: 0, name: "status" } as TaskStatusType,
    priority: { id: 0, name: "priority", icon: "" } as PriorityType,
    department: { id: 0, name: "department" } as DepartmentType,
    employee: {
      id: 0,
      name: "",
      surname: "",
      avatar: null,
      department: { id: 0, name: "" } as DepartmentType,
    } as EmployeeType,
  });

  const changeTitle = (name: string, value: string) => {
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(taskData.name);
  }, [taskData]);

  return (
    <div className="mt-[40px]">
      <h2 className="text-[34px] font-semibold">შექმნი ახალი დავალება</h2>
      <div className="pt-[65px]">
        <div className="px-[55px]">
          <Input
            label={"სათაური*"}
            name={"name"}
            value={taskData.name}
            onChange={changeTitle}
            required
            minLength={3}
            maxLength={255}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default NewTask;
