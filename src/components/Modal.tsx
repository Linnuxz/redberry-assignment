import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Input from "./Input";
import ImageUpload from "./ImageUpload";
import { DepartmentType, EmployeeType } from "../types";
import { useApi } from "../hooks/useApi.ts";

import ModalX from "../assets/ModalX.svg";
import { postEmployee } from "../api/api.ts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { departments } = useApi();

  const modalRef = React.useRef<HTMLDivElement>(null);

  const [employeeData, setEmployeeData] = useState<EmployeeType>({
    id: 0,
    name: "",
    surname: "",
    avatar: null,
    department: { id: 0, name: "" } as DepartmentType,
  });

  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !employeeData.name ||
      !employeeData.surname ||
      !employeeData.avatar ||
      !employeeData.department.id
    ) {
      alert("გთხოვთ შეავსოთ ყველა ველი.");
      return;
    }

    try {
      await postEmployee(employeeData);
      alert("თანამშრომელი წარმატებით დაემატა!");
      onClose();
    } catch (error) {
      alert("შეცდომა მოხდა თანამშრომლის დამატების დროს: " + error);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setEmployeeData((prev) => ({ ...prev, avatar: file }));
  };

  const handleDepartmentChange = (department: DepartmentType) => {
    setEmployeeData((prev) => ({
      ...prev,
      department: department,
    }));

    setOpenDropDown(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setEmployeeData({
        id: 0,
        name: "",
        surname: "",
        avatar: null,
        department: { id: 0, name: "" } as DepartmentType,
      });
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="bg-opacity-30 fixed inset-0 z-[99] bg-[#0D0F1026] backdrop-blur-[8px]"
        onClick={onClose}
      ></div>

      <div className="fixed inset-x-0 top-[118px] z-[100] flex items-center justify-center pt-[40px]">
        <div
          ref={modalRef}
          className="relative flex w-auto max-w-[90%] flex-col justify-center rounded-lg bg-white p-6 px-[50px] pt-[100px] pb-[40px] shadow-lg"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <img className="h-10 w-10" src={ModalX} alt="X" />
          </button>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-[20px]">
            <h2 className="mr-auto ml-auto text-[32px] font-medium text-[#212529]">
              თანამშრომლის დამატება
            </h2>
            <div className="flex w-full flex-wrap justify-center gap-[20px]">
              <Input
                label="სახელი*"
                name="name"
                value={employeeData.name}
                onChange={handleInputChange}
                required
                minLength={2}
                maxLength={255}
                pattern="^[a-zA-Zა-ჰ\s]+$"
              />
              <Input
                label="გვარი*"
                name="surname"
                value={employeeData.surname}
                onChange={handleInputChange}
                required
                minLength={2}
                maxLength={255}
                pattern="^[a-zA-Zა-ჰ\s]+$"
              />
            </div>
            <ImageUpload label="ავატარი*" onChange={handleFileChange} />

            <div className="relative mt-4 mb-[40px] w-[384px]">
              <label
                className="text-[14px] font-medium text-gray-700"
                htmlFor="department"
              >
                დეპარტამენტი*
              </label>
              <div
                className={`mt-2 flex ${openDropDown ? "border-[#8338EC]" : "border-[#CED4DA]"} h-[42px] w-[384px] cursor-pointer items-center justify-between rounded-lg border-1 p-2`}
                onClick={() => setOpenDropDown(!openDropDown)}
              >
                <span className="text-[14px] font-light text-[#0D0F10]">
                  {employeeData.department.name
                    ? employeeData.department.name
                    : ""}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 transition-transform duration-300 ${
                    openDropDown ? "rotate-180 text-[#8338EC]" : "rotate-0"
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
              </div>

              <div
                className={`absolute top-full left-0 z-10 mt-2 max-h-0 w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-all duration-300 ease-in-out ${
                  openDropDown ? "max-h-96" : ""
                }`}
              >
                {departments.map((department) => (
                  <button
                    type="button"
                    key={department.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDepartmentChange(department);
                    }}
                    className="cursor-pointer p-2 px-[14px] pt-[14px] text-[14px] font-light text-[#0D0F10] hover:bg-gray-100"
                  >
                    {department.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-[22px]">
              <button
                onClick={onClose}
                className="cursor-pointer rounded-[5px] border-[1px] border-[#8338EC] px-4 py-[10px] text-[16px] text-[#343A40] hover:border-[#B588F4] hover:duration-500"
              >
                გაუქმება
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-[5px] bg-[#8338EC] px-[20px] py-[10px] text-lg text-white hover:bg-[#B588F4] hover:duration-500"
              >
                დაამატე თანამშრომელი
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;
