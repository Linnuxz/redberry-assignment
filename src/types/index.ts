export interface DepartmentType {
  id: number;
  name: string;
}

export interface PriorityType {
  id: number;
  name: string;
  icon: string;
}

export interface EmployeeType {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: DepartmentType;
}

export interface TaskStatusType {
  id: number;
  name: string;
}

export interface TaskType {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: TaskStatusType;
  priority: PriorityType;
  department: DepartmentType;
  employee: EmployeeType;
}
