import React, { ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { chooseAnswer } from "../store/features/question/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAnswerContext } from "../store/context/AnswerContext";
import QuizResult from "./QuizResult";

/* const q = [
  {
    question:
      "Which of these games takes place in the Irish town of Doolin, with the option to play as one of the characters, Ellen and Keats?",
    correct_answer: "Folklore",
    incorrect_answers: [
      "Shadow of the Colossus",
      "ICO",
      "Beyond Good &amp; Evil",
    ],
  },
  {
    question:
      "Which of these games takes place in the Irish town of Doolin, with the option to play as one of the characters, Ellen and Keats?",
    correct_answer: "Folklore",
    incorrect_answers: [
      "Shadow of the Colossus",
      "ICO",
      "Beyond Good &amp; Evil",
    ],
  },
  {
    question:
      "Which of these games takes place in the Irish town of Doolin, with the option to play as one of the characters, Ellen and Keats?",
    correct_answer: "Folklore",
    incorrect_answers: [
      "Shadow of the Colossus",
      "ICO",
      "Beyond Good &amp; Evil",
    ],
  },
  {
    question:
      "Which of these games takes place in the Irish town of Doolin, with the option to play as one of the characters, Ellen and Keats?",
    correct_answer: "Folklore",
    incorrect_answers: [
      "Shadow of the Colossus",
      "ICO",
      "Beyond Good &amp; Evil",
    ],
  },
  {
    question:
      "In the Amazing World of Gumball&quot;, who is the principal of Elmore Junior High?",
    correct_answer: "Principal Brown",
    incorrect_answers: [
      "Principal Small",
      "Principal Brawn",
      "Principal Simeon",
    ],
  },
]; */

export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
}
const QuizInterface = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state: RootState) => state.auth.user);

  const { chooseAnswer, answeredQuestions, questionsAnsweredCount } =
    useAnswerContext();

  const [questions, setQuestions] = React.useState<Question[]>([]);
  const { quiz_type } = useParams();
  const [totalQuestionsCount, setTotalQuestionsCount] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    answer: string,
    correctAnswer: string
  ) => {
    //dispatch(chooseAnswer({ id, answer, correctAnswer }));
    chooseAnswer({ id, answer, correctAnswer });
  };
  console.log({ quiz_type });
  const handleSubmitQuiz = async () => {
    console.log("hey", quiz_type);
    if (totalQuestionsCount !== questionsAnsweredCount) {
      return;
    }

    let count = 0;
    for (let answeredQuestion of answeredQuestions) {
      if (answeredQuestion.answer === answeredQuestion.correctAnswer) {
        count++;
      }
    }
    const quizParamsArray = quiz_type?.split("&");
    const requestBody: Record<string, string> = {};
    console.log({ quizParamsArray });
    for (let param of quizParamsArray as []) {
      let paramName = param.split("=");
      requestBody[paramName[0]] = paramName[1] ? paramName[1] : "Any";
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/scores/save-score`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body:
            quiz_type === "quick-quiz"
              ? JSON.stringify({
                  category: "Any",
                  type: "Any",
                  difficulty: "Any",
                  userId: _id,
                  score: count,
                })
              : JSON.stringify({ ...requestBody, userId: _id, score: count }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (e) {}

    setTotalScore(count);
  };

  React.useEffect(() => {
    const getQuizQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/quiz/?${quiz_type}`
        );
        const responseData = await response.json();

        if (responseData.success) {
          setQuestions(responseData.data.results);
          setTotalQuestionsCount(responseData.data.count);
          return response;
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    };
    getQuizQuestions();
  }, []);

  return totalScore === 0 ? (
    <div className="rounded-lg px-3 pt-7 pb-3 bg-[#37373e] text-white ">
      {questions.map((question, index) => {
        return (
          <div className="mb-7" key={question.id}>
            <h2 className="text-lg">{index + 1 + ". " + question.question}</h2>
            <div className="px-4">
              {question.answers.map((answer) => {
                return (
                  <div className="space-x-3 hover:text-[#fe9d73] " key={answer}>
                    <input
                      type="radio"
                      id={answer}
                      name={question.id}
                      value={answer}
                      className="hover:cursor-pointer"
                      onChange={(e) =>
                        handleChange(
                          e,
                          question.id,
                          answer,
                          question.correctAnswer
                        )
                      }
                    />{" "}
                    <label htmlFor={answer} className="hover:cursor-pointer">
                      {answer}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex justify-end pt-5 pb-3 space-x-3">
        <button
          onClick={handleSubmitQuiz}
          className="text-center bg-[#fe9d73] rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black"
        >
          Submit
        </button>
        {/*  <button className="text-center bg-[#fe9d73] rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black">
          Prev
        </button>{" "}
        {totalQuestionsCount > 5 && (
          <button className=" text-center bg-[#fe9d73] rounded-xl px-4 py-3 text-md hover:opacity-[.9] text-black">
            Next
          </button>
        )} */}
      </div>
    </div>
  ) : (
    <QuizResult score={totalScore} questionsCount={totalQuestionsCount} />
  );
};

export default QuizInterface;
