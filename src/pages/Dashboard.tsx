import { useState, useEffect } from "react";
import FilterLists from "../components/FilterLists.tsx";

import Board from "../components/Board.tsx";
import { DepartmentType, EmployeeType, PriorityType } from "../types";
import { useApi } from "../hooks/useApi.ts";

import X from "../assets/x.png";

const Dashboard = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const { departments, priorities, employees, statuses, tasks } = useApi();

  const [selectedDepartments, setSelectedDepartments] = useState<
    DepartmentType[]
  >([]);
  const [selectedPriorities, setSelectedPriorities] = useState<PriorityType[]>(
    [],
  );
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeType[]>(
    [],
  );

  useEffect(() => {
    const savedDepartments = localStorage.getItem("selectedDepartments");
    const savedPriorities = localStorage.getItem("selectedPriorities");
    const savedEmployees = localStorage.getItem("selectedEmployees");

    if (savedDepartments) setSelectedDepartments(JSON.parse(savedDepartments));
    if (savedPriorities) setSelectedPriorities(JSON.parse(savedPriorities));
    if (savedEmployees) setSelectedEmployees(JSON.parse(savedEmployees));
  }, []);

  const handleSelectionChange = (
    departments: DepartmentType[],
    priorities: PriorityType[],
    employees: EmployeeType[],
  ) => {
    setSelectedDepartments(departments);
    setSelectedPriorities(priorities);
    setSelectedEmployees(employees);

    localStorage.setItem("selectedDepartments", JSON.stringify(departments));
    localStorage.setItem("selectedPriorities", JSON.stringify(priorities));
    localStorage.setItem("selectedEmployees", JSON.stringify(employees));
  };

  const toggleDropdown = (index: number | null) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const onXClick = (
    type: "department" | "priority" | "employee",
    id: number,
  ) => {
    if (type === "department") {
      setSelectedDepartments((prev) => prev.filter((dep) => dep.id !== id));
    } else if (type === "priority") {
      setSelectedPriorities((prev) => prev.filter((p) => p.id !== id));
    } else if (type === "employee") {
      setSelectedEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const filteredTasks = tasks?.filter((task) => {
    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.some((dep) => dep.id === task.department.id);
    const matchesPriority =
      selectedPriorities.length === 0 ||
      selectedPriorities.some((p) => p.id === task.priority.id);
    const matchesEmployee =
      selectedEmployees.length === 0 ||
      selectedEmployees.some((emp) => emp.id === task.employee.id);

    return matchesDepartment && matchesPriority && matchesEmployee;
  });

  return (
    <div className="mt-[40px]">
      <h1 className="mb-[52px] text-[34px] font-semibold">
        დავალებების გვერდი
      </h1>
      <div className="relative inline-flex gap-[45px] rounded-[10px] border border-[#DEE2E6] px-4.5 py-2.5">
        <div className="w-full">
          <FilterLists
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            departments={departments}
            priorities={priorities}
            employees={employees}
            onSelectionChange={handleSelectionChange}
            selectedDepartments={selectedDepartments}
            selectedPriorities={selectedPriorities}
            selectedEmployees={selectedEmployees}
          />
        </div>
      </div>
      <div className="absolute z-3 mt-[10px] flex gap-2">
        {selectedDepartments.map((dep) => (
          <div
            key={dep.id}
            className="flex items-center justify-center rounded-[43px] border border-[#CED4DA] px-[5px] py-[5px] text-[14px] text-[#021526CC]"
          >
            {dep.name}
            <button onClick={() => onXClick("department", dep.id)}>
              <img src={X} alt="remove-filter" className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {selectedPriorities.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-center rounded-[43px] border border-[#CED4DA] px-[5px] py-[5px] text-[14px] text-[#021526CC]"
          >
            {p.name}
            <button onClick={() => onXClick("priority", p.id)}>
              <img src={X} alt="remove-filter" className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {selectedEmployees.map((emp) => (
          <div
            key={emp.id}
            className="flex items-center justify-center rounded-[43px] border border-[#CED4DA] px-[5px] py-[5px] text-[14px] text-[#021526CC]"
          >
            {emp.name}
            <button onClick={() => onXClick("employee", emp.id)}>
              <img src={X} alt="remove-filter" className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-[79px]">
        <Board statuses={statuses || []} tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default Dashboard;
