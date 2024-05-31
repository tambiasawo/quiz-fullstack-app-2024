import React from "react";
import { useNavigate } from "react-router-dom";

const QuizBox = ({
  category,
  imgUrl,
}: {
  category: string;
  imgUrl: string;
}) => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = React.useState("");
  const [type, setType] = React.useState("");
  const [amount, setAmount] = React.useState("");
  return (
    <div className="main-box flex flex-col items-center justify-center">
      <img
        src={imgUrl}
        width="300px"
        height="100px"
        alt="quiz logo"
        className="rounded-lg object-cover max-w-[50%]"
      />
      <h2 className="text-xl text-white font-semibold">{category}</h2>
      <div className="flex flex-col gap-4 max-w-sm w-full ">
        <div className="flex items-center justify-center b500 gap-3">
          <label htmlFor="questions length">Number of Questions: </label>
          <input
            type="number"
            name="questions length"
            id="questions length"
            className="w-full py-1 px-2 rounded-lg outline-none"
            min="5"
            max="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <label htmlFor="difficulty">Difficulty: </label>{" "}
          <select
            name="difficulty"
            id="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
            className="p-1 rounded-lg w-full"
          >
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex items-center justify-center gap-3">
          <label htmlFor="type">Type: </label>{" "}
          <select
            name="type"
            id="type"
            className="p-1 rounded-lg w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Any</option>
            <option value="multiple">Multiple</option>
            <option value="boolean">True/False</option>
          </select>
        </div>
      </div>
      <button
        onClick={() =>
          navigate(
            `/quiz/category=${category}&amount=${amount}&type=${type}&difficulty=${difficulty}`
          )
        }
        className="mt-3 text-center bg-[#fe9d73] rounded-xl px-7 py-3 text-lg hover:opacity-[.9] text-black"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizBox;
