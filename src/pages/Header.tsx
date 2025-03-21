import Momentum from "../assets/Momentum.svg";
import Hourglass from "../assets/Hourglass.png";
import Add from "../assets/Add.svg";
import { useState } from "react";
import Modal from "../components/Modal.tsx";
import { Link } from "react-router-dom";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full bg-white px-[120px] py-[15px]">
        <div className="flex items-center justify-between py-[30px]">
          <div className="flex">
            <img src={Momentum} alt="logo" />
            <img
              src={Hourglass}
              alt="hourglass"
              className="h-[38px] w-[38px]"
            />
          </div>

          <div className="flex gap-10 text-[16px]">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-[5px] border-[1px] border-[#8338EC] px-[20px] py-2.5 hover:border-[#B588F4] hover:duration-500"
            >
              თანამშრომლის შექმნა
            </button>
            <Link
              to="/new-task"
              className="flex cursor-pointer items-center justify-center gap-0.5 rounded-[5px] border bg-[#8338EC] px-[20px] py-2.5 text-nowrap text-white hover:bg-[#B588F4] hover:duration-500"
            >
              <img src={Add} alt="add-button" className="h-5 w-5" />
              <p>შექმენი ახალი დავალება</p>
            </Link>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
