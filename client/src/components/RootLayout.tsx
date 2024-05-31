import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { SignIn } from "../pages/SignIn";

export default function Root() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {user ? (
        <div className="grid-cols-1 md:grid md:grid-cols-12 h-[100vh]">
          <div className="hidden md:block md:col-span-2 border-r border-r-[#37373e] h-screen overflow-hidden">
            <Navbar />
          </div>
          <div className="col-span-10 px-5 pb-5 h-[100vh] overflow-y-auto">
            <Header />
            <Outlet />
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
}
