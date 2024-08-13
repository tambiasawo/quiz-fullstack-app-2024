import Table from "../components/Table";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { scoreColumns, leaderboardColumns } from "../utils/columns";
import ScoreSummary from "../components/ScoreSummary";
import { Scores, useGetScores, useGetTopScores } from "../hooks/useScores";
import { GoTasklist } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  "Any",
  "Entertainment: Music",
  "General Knowledge",
  "Entertainment: Movies",
  "Science & Nature",
  "Sports",
];

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const { data: { results: scores } = { results: [] }, isFetching } =
    useGetScores(user?._id);
  const {
    data: { results: topScores } = { results: [] },
    isFetching: isFetchingTopScores,
  } = useGetTopScores();

  const recommendedCategories = categories.filter((category) => {
    const cat = scores.find((score: Scores) => score.category === category);
    return !cat;
  });

  const recommendations =
    recommendedCategories.length > 0 ? recommendedCategories : categories;

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
          <main className=" flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ScoreSummary scores={scores} isFetching={isFetching} />{" "}
              <div className="main-box">
                <div className="flex flex-col space-y-7">
                  <div className="flex gap-4 items-center">
                    <GoTasklist size={28} className="text-white" />{" "}
                    <h2 className=" text-white text-xl">Quizzes Taken</h2>
                  </div>
                  <div className="max-w-lg mx-auto flex flex-col gap-1 items-center">
                    <div className="bg-[#fe9d73]  w-[190px] h-[190px] md:w-[140px] md:h-[140px] lg:w-[190px] lg:h-[190px] rounded-full flex justify-center items-center p-3">
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
                </div>
                <ul className="flex flex-col pt-5 items-center justify-center">
                  {recommendations.map((recommendation) => (
                    <Link to={`/quizzes`} key={recommendation}>
                      <li className="text-white text-lg pb-2 hover:underline">
                        {recommendation}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="col-span-1">
                <h1 className="text-white text-xl">Results</h1>
                <Table
                  columns={scoreColumns}
                  rows={scores}
                  isLoading={isFetching}
                />
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
