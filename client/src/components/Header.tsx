import React from "react";
import { HiSearch, HiOutlineMoon, HiOutlineBell } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { navItems } from "./Navbar";
import { IoCloseOutline, IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  const getHeader = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname.includes("quick")) return "Quiz > Quick Quiz";
    if (pathname.substring(1, 5) === "quiz" && pathname.length > 8) {
      const splittedPathname = pathname.split("/category");
      const ampersandIndex = splittedPathname[1]?.indexOf("&");
      const breadcrumb = splittedPathname[1].substring(1, ampersandIndex);
      return decodeURIComponent(`Quiz > ${breadcrumb}`);
    }
    return pathname[1].toLocaleUpperCase() + pathname.substring(2);
  };

  return (
    <div className="pr-0 bg-[#242528] md:pr-1 sticky z-10 top-0 py-5">
      {open ? (
        <div
          className={`w-full ease-in-out duration-500 transition-transform transform pr-4 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center">
            <span onClick={() => setOpen(false)} className="p-1">
              <IoCloseOutline size={28} className="cursor-pointer" />
            </span>
            <span className="flex gap-1 items-center">
              <IoLogOutOutline /> <h3> Logout</h3>
            </span>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <img src="/assets/logo.png" alt="logo" className="" />
            <ul className="mt-5">
              {navItems.map((navItem) => (
                <li
                  key={navItem.title}
                  className="py-3 px-20  hover:opacity-80 cursor-pointer hover:bg-[#37373e] mb-2 rounded-lg"
                >
                  <span className="flex gap-4 items-center">
                    <navItem.icon /> <h3>{navItem.title}</h3>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex-[30%]">
            <h1 className="text-2xl font-bold hidden md:block text-white">
              {getHeader()}
            </h1>
            <RxHamburgerMenu
              className="block md:hidden cursor-pointer"
              size="28"
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>

          <div className="flex justify-between items-center gap-3 ">
            {/*   <div
              className={` w-full hidden md:flex items-center justify-start px-1 rounded-lg ${
                !hideOutline ? "border-2 border-[#313134]" : ""
              }`}
              onFocus={() => {
                setHideOutline(false);
              }}
              onBlur={() => {
                setHideOutline(true);
              }}
            >
              <HiSearch size={20} className="hidden md:block" />
              <input
                type="search"
                placeholder="Search here..."
                className="w-full bg-[#242528] rounded-lg py-2 px-3 outline-none hidden md:block"
              />
            </div> */}
            <div className="flex items-center justify-between gap-2 md:gap-4 cursor-pointer ">
              <div className="px-2 rounded-lg block md:hidden">
                <HiSearch
                  size={28}
                  //className={`${!hideOutline ? "border border-slate-400" : ""}`}
                />
              </div>
              <div className="border p-2 rounded-lg border-slate-400">
                <HiOutlineMoon size={20} className="" />
              </div>
              <div className="border p-2 rounded-lg border-slate-400">
                <HiOutlineBell size={20} className="" />
              </div>

              <Link to="/profile" className="w-10 h-10">
                <img
                  src={
                    user?.profileImage ||
                    "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb"
                  }
                  alt="propfil image"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
