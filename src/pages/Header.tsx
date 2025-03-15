import Momentum from "../assets/Momentum.svg";
import Hourglass from "../assets/Hourglass.png";
import Add from "../assets/Add.svg";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-[30px]">
      <div className="flex">
        <img src={Momentum} alt="logo" />
        <img src={Hourglass} alt="hourglass" className="h-[38px] w-[38px]" />
      </div>

      <div className="flex gap-10 text-[16px]">
        <button className="cursor-pointer rounded-[5px] border-[1px] border-[#8338EC] px-[20px] py-2.5 hover:border-[#B588F4] hover:duration-500">
          თანამშრომლის შექმნა
        </button>
        <button className="flex items-center justify-center gap-0.5 rounded-[5px] border bg-[#8338EC] px-[20px] py-2.5 text-nowrap text-white hover:bg-[#B588F4] hover:duration-500">
          <img src={Add} alt="add-button" className="h-5 w-5" />
          <p>შექმენი ახალი დავალება</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
