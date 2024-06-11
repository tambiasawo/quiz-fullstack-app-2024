import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { PiExam } from "react-icons/pi";
import { TbHelpCircle } from "react-icons/tb";

import { Link } from "react-router-dom";
import { signOut } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";

export const navItems = [
  {
    path: "/",
    icon: LuLayoutDashboard,
    title: "Dashboard",
  },
  {
    path: "/quizzes",
    icon: PiExam,
    title: "Quizzes",
  },
  {
    path: "/results",
    icon: HiOutlineDocumentReport,
    title: "Results",
  },
  /*  {
    icon: HiOutlineMail,
    title: "LeaderBoard",
  }, */
  {
    path: "/faq",
    icon: TbHelpCircle,
    title: "Help/FAQ",
  },
];

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout");
      const data = await response.json();
      if (data.success) {
        dispatch(signOut());
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-3 pt-2 overflow-hidden h-[100vh] relative">
      <div className="flex gap-3 items-center pt-2">
        <img
          src="/assets/logo.png"
          alt="logo"
          // className="w-14 h-14 object-cover"
        />
      </div>
      
      <ul className="pt-5 list-none m-0">
        {navItems.map((item) => (
          <li
            key={item.title}
            className="p-3 hover:opacity-80 cursor-pointer hover:bg-[#37373e] mb-2 rounded-lg hover:text-white"
          >
            <Link to={item.path}>
              <span className="flex gap-4 items-center">
                <item.icon /> <h3>{item.title}</h3>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className="w-[90%] absolute bottom-4 flex gap-4 items-center p-3 hover:opacity-80 cursor-pointer hover:bg-[#37373e] rounded-lg  hover:text-white"
        onClick={handleSignOut}
      >
        <IoLogOutOutline /> <h3> Logout</h3>
      </div>
    </div>
  );
};

export default Navbar;
