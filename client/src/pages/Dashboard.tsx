import Table from "../components/Table";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { scoreColumns, leaderboardColumns } from "../utils/columns";
import ScoreSummary from "../components/ScoreSummary";
import { useGetScores, useGetTopScores } from "../hooks/useScores";
import { GoTasklist } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";

const actionColumn = {
  field: "action",
  headerName: "Action",
  minWidth: 120,
  renderCell: () => {
    return (
      <a href="#" className="underline">
        View
      </a>
    );
  },
};

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const { data: { results: scores } = { results: [] }, isFetching } =
    useGetScores(user?._id);
  const {
    data: { results: topScores } = { results: [] },
    isFetching: isFetchingTopScores,
  } = useGetTopScores();

  const scoreCols = React.useMemo(() => {
    return [...scoreColumns, actionColumn];
  }, []);

  console.log({ scores });
  /*if scores.length > 5 */
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-white text-xl">Welcome, {user?.name}! </h1>
        <button
          onClick={() => {
            navigate("/quiz/quick-quiz");
          }}
          className=" text-center bg-[#fe9d73] rounded-xl px-2 py-2 text-md hover:opacity-[.9] text-black"
        >
          Quick Quiz
        </button>{" "}
      </div>
      <div className="grid-cols-1 md:grid md:grid-cols-12 ">
        <div className=" col-span-12 py-3">
          <main className=" flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ScoreSummary scores={scores} isFetching={isFetching} />{" "}
              <div className="main-box">
                <div className="flex flex-col space-y-7">
                  <div className="flex gap-4 items-center">
                    <GoTasklist size={28} className="text-white" />{" "}
                    <h2 className=" text-white text-xl">Quizzes Taken</h2>
                  </div>
                  <div className="max-w-lg mx-auto flex flex-col gap-1 items-center">
                    <div className="bg-[#fe9d73]  w-[190px] h-[190px] rounded-full flex justify-center items-center p-3">
                      <h1 className="text-black text-6xl text-center ">
                        {scores?.length || 0}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-box">
                <div className="flex gap-4 items-center">
                  <FaCalendarAlt size={28} className="text-white" />
                  <h2 className=" text-white text-xl">Recommended Quizzes</h2>
                  <ul>{}</ul>
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="col-span-1">
                <h1 className="text-white text-xl">Results</h1>
                <div className="bg-[#37373e]">
                  <Table
                    columns={scoreCols}
                    rows={scores || []}
                    isLoading={isFetching}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-white text-xl">LeaderBoard</h1>
                <Table
                  columns={leaderboardColumns}
                  rows={topScores}
                  isLoading={isFetchingTopScores}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
