import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const QuizResult = ({
  score,
  questionsCount,
}: {
  score: number;
  questionsCount: number;
}) => {
  return (
    <div className="flex flex-col gap-4 mx-auto max-w-lg mt-20 text-white  bg-[#37373e] rounded-lg px-7 py-7">
      <h1 className="text-2xl font-semibold text-center">You Scored</h1>
      <h1 className="text-7xl font-semibold text-center">
        {Math.floor((score / questionsCount) * 100)}%
      </h1>
      <div className="flex justify-between gap-3 items-center mt-10">
        <span className="flex gap-4">
          <FaCheck size={20} className="text-green-500" /> {score} Questions{" "}
        </span>
        <span className="flex gap-4">
          <IoCloseSharp size={20} className="text-red-500" />{" "}
          {questionsCount - score} Questions
        </span>
      </div>
      <div className="flex justify-between gap-3 items-center">
        <button className="mt-3 text-center bg-[#fe9d73] rounded-xl px-5 py-2 text-md hover:opacity-[.9] text-black">
          <Link to="/quizzes"> Try Again</Link>
        </button>
        <button className="mt-3 text-center bg-[#fe9d73] rounded-xl px-5 py-2 text-md hover:opacity-[.9] text-black">
          <Link to="/results"> See Past Results</Link>
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
