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
  avatar: File | null;
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

export interface CommentType {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments: CommentType[];
}
