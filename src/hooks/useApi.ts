import { useState, useEffect } from "react";
import {
  fetchDepartments,
  fetchEmployees,
  fetchPriorities,
  fetchStatuses,
  fetchTasks,
} from "../api/api";
import { DepartmentType, EmployeeType, PriorityType, TaskType } from "../types";

export const useApi = () => {
  const [statuses, setStatuses] = useState<
    { id: number; name: string }[] | null
  >(null);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [priorities, setPriorities] = useState<PriorityType[]>([]);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const statusesData = await fetchStatuses();
        const tasksData = await fetchTasks();
        const departmentsData = await fetchDepartments();
        const prioritiesData = await fetchPriorities();
        const employeesData = await fetchEmployees();

        setStatuses(statusesData);
        setTasks(tasksData);
        setDepartments(departmentsData);
        setPriorities(prioritiesData);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return { statuses, tasks, departments, priorities, employees };
};
