import React from "react";
import { GrScorecard } from "react-icons/gr";
import Table from "../components/Table";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log({ user });
  return (
    <div className="grid-cols-1 md:grid md:grid-cols-12 ">
      <div className=" col-span-12 py-3">
        <main className=" flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="main-box bg-[#a6abff]">
              <div className="flex gap-4 items-center">
                <GrScorecard
                  size={48}
                  className="border rounded-xl p-2 bg-white text-black"
                />{" "}
                <h2 className="font-semibold text-black text-xl">
                  Most Recent Score
                </h2>
              </div>
              <img
                className="mx-auto"
                width="128"
                height="128"
                src="/assets/success.png"
                alt="most recent score"
              />
              <div className="">
                <p className="text-slate-700">
                  <span className="text-black"> +14%</span> Since last week
                </p>
                <h1 className="text-3xl text-black font-bold">97.9%</h1>
              </div>
            </div>

            <div className="main-box">
              <div className="flex gap-4 items-center">
                <GrScorecard
                  size={48}
                  className="border rounded-xl p-2 bg-white text-black"
                />{" "}
                <h2 className="font-semibold text-black text-xl">
                  Score Report
                </h2>
              </div>
            </div>
            <div className="main-box">3</div>
          </div>

          <div className="bg-[#37373e]">
            <Table />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
