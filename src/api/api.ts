import axios from "axios";
import { EmployeeType } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchStatuses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/statuses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/departments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const fetchPriorities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/priorities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching priorities:", error);
    throw error;
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/employees`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const fetchCommentsByTaskId = async (taskId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/${taskId}/comments`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const postEmployee = async (employee: EmployeeType) => {
  const formData = new FormData();
  formData.append("name", employee.name);
  formData.append("surname", employee.surname);
  formData.append("avatar", employee.avatar as Blob);
  formData.append("department_id", employee.department.id.toString());

  try {
    const response = await axios.post(`${BASE_URL}/employees`, formData, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting employee:", error);
    throw error;
  }
};
