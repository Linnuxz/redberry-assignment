import { FC, useEffect, useRef, useState } from "react";
import { DepartmentType, EmployeeType, PriorityType } from "../types";
import CheckVector from "../assets/Vector.svg";

interface FilterListProps {
  openDropdown: number | null;
  toggleDropdown: (index: number | null) => void;
  departments: DepartmentType[];
  priorities: PriorityType[];
  employees: EmployeeType[];
  onSelectionChange: (
    selectedDepartments: DepartmentType[],
    selectedPriorities: PriorityType[],
    selectedEmployees: EmployeeType[],
  ) => void;
  selectedDepartments: DepartmentType[];
  selectedPriorities: PriorityType[];
  selectedEmployees: EmployeeType[];
}

const FilterLists: FC<FilterListProps> = ({
  openDropdown,
  toggleDropdown,
  departments,
  priorities,
  employees,
  onSelectionChange,
  selectedDepartments,
  selectedPriorities,
  selectedEmployees,
}) => {
  const [tempDepartments, setTempDepartments] = useState<DepartmentType[]>([]);
  const [tempPriorities, setTempPriorities] = useState<PriorityType[]>([]);
  const [tempEmployees, setTempEmployees] = useState<EmployeeType[]>([]);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>(
    new Array(3).fill(null),
  );

  useEffect(() => {
    const savedDepartments = localStorage.getItem("selectedDepartments");
    const savedPriorities = localStorage.getItem("selectedPriorities");
    const savedEmployees = localStorage.getItem("selectedEmployees");

    if (savedDepartments) setTempDepartments(JSON.parse(savedDepartments));
    if (savedPriorities) setTempPriorities(JSON.parse(savedPriorities));
    if (savedEmployees) setTempEmployees(JSON.parse(savedEmployees));
  }, []);

  useEffect(() => {
    setTempDepartments(selectedDepartments);
    setTempPriorities(selectedPriorities);
    setTempEmployees(selectedEmployees);
  }, [selectedDepartments, selectedPriorities, selectedEmployees]);

  const toggleTempDepartment = (department: DepartmentType) => {
    setTempDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((dep) => dep !== department)
        : [...prev, department],
    );
  };

  const toggleTempPriority = (priority: PriorityType) => {
    setTempPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority],
    );
  };

  const toggleTempEmployee = (employee: EmployeeType) => {
    setTempEmployees((prev) => (prev.includes(employee) ? [] : [employee]));
  };

  const onSaveClick = () => {
    onSelectionChange(tempDepartments, tempPriorities, tempEmployees);

    localStorage.setItem(
      "selectedDepartments",
      JSON.stringify(tempDepartments),
    );
    localStorage.setItem("selectedPriorities", JSON.stringify(tempPriorities));
    localStorage.setItem("selectedEmployees", JSON.stringify(tempEmployees));

    toggleDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isButtonClicked = buttonRefs.current.some(
        (button) => button && button.contains(e.target as Node),
      );
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node) &&
        !isButtonClicked
      ) {
        toggleDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDropdown]);

  return (
    <div className="relative flex w-full flex-col gap-4">
      <div className="flex w-full gap-[45px]">
        {[
          { id: 1, label: "დეპარტამენტი" },
          { id: 2, label: "პრიორიტეტი" },
          { id: 3, label: "თანამშრომელი" },
        ].map(({ id, label }, index) => (
          <div key={id} className="relative w-full">
            <button
              ref={(el: HTMLButtonElement | null) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => toggleDropdown(id)}
              className={`flex w-full items-center justify-between gap-2 rounded-md p-2 ${
                openDropdown === id ? "text-[#8338EC]" : ""
              }`}
            >
              {label}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 transition-transform duration-300 ${
                  openDropdown === id ? "rotate-180 text-[#8338EC]" : "rotate-0"
                }`}
              >
                <g id="Icon">
                  <path
                    id="Shape"
                    d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {openDropdown !== null && (
        <div
          ref={dropDownRef}
          className="absolute top-full left-0 z-10 mt-2 flex w-full flex-col rounded-[10px] border border-[#8338EC] bg-white p-2 px-[20px] py-[40px] shadow-md"
        >
          {openDropdown === 1 &&
            departments.map((department) => (
              <button
                key={department.id}
                onClick={() => toggleTempDepartment(department)}
                className="flex cursor-pointer items-center gap-[15px] p-2 text-left"
              >
                <label className="flex flex-col space-y-4">
                  <input
                    type="checkbox"
                    checked={tempDepartments.includes(department)}
                    onChange={() => toggleTempDepartment(department)}
                    className="peer hidden"
                  />
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md border-2 border-gray-700 peer-checked:border-gray-700 peer-checked:bg-white">
                    {tempDepartments.includes(department) && (
                      <img src={CheckVector} alt="check" />
                    )}
                  </div>
                </label>
                <p className="text-[16px] text-[#212529]">{department.name}</p>
              </button>
            ))}
          {openDropdown === 2 &&
            priorities.map((priority) => (
              <button
                key={priority.id}
                onClick={() => toggleTempPriority(priority)}
                className="flex cursor-pointer items-center gap-[15px] p-2 text-left"
              >
                <label className="flex flex-col space-y-4">
                  <input
                    type="checkbox"
                    checked={tempPriorities.includes(priority)}
                    onChange={() => toggleTempPriority(priority)}
                    className="peer hidden"
                  />
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md border-2 border-gray-700 peer-checked:border-gray-700 peer-checked:bg-white">
                    {tempPriorities.includes(priority) && (
                      <img src={CheckVector} alt="check" />
                    )}
                  </div>
                </label>
                <p className="text-[16px] text-[#212529]">{priority.name}</p>
              </button>
            ))}
          {openDropdown === 3 &&
            employees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => toggleTempEmployee(employee)}
                className="flex cursor-pointer items-center gap-[15px] p-2 text-left"
              >
                <label className="flex flex-col space-y-4">
                  <input
                    type="checkbox"
                    checked={tempEmployees.includes(employee)}
                    onChange={() => toggleTempEmployee(employee)}
                    className="peer hidden"
                  />
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md border-2 border-gray-700 peer-checked:border-gray-700 peer-checked:bg-white">
                    {tempEmployees.includes(employee) && (
                      <img src={CheckVector} alt="check" />
                    )}
                  </div>
                </label>
                <img
                  className="h-[28px] w-[28px] rounded-full"
                  src={
                    employee.avatar && employee.avatar instanceof File
                      ? URL.createObjectURL(employee.avatar)
                      : employee.avatar || "../assets/spn-logo.jpg"
                  }
                  alt="avatar"
                />
                <p className="text-[16px] text-[#212529]">{employee.name}</p>
              </button>
            ))}
          <div className="flex justify-end">
            <button
              onClick={onSaveClick}
              className="w-auto rounded-[20px] bg-[#8338EC] px-[55px] py-[10px] text-[16px] text-white"
            >
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterLists;
