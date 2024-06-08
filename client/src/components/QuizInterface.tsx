import React from "react";
import { useParams } from "react-router-dom";
import { chooseAnswer, reset } from "../store/features/question/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import QuizResult from "./QuizResult";
import useGetQuestions, { Question } from "../hooks/useGetQuestions";
import { useSaveScore } from "../hooks/useSaveScore";

interface ResponseData {
  results: Question[];
  count: number;
}

const QuizInterface = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const { answeredQuestions, questionsAnsweredCount } = useSelector(
    (state: RootState) => state.question
  );

  const [questions, setQuestions] = React.useState<Question[]>([]);
  const { quiz_type } = useParams();
  const [totalScore, setTotalScore] = React.useState<undefined | number>();
  const [page, setPage] = React.useState(1);
  const {
    data = { results: [], count: 0 },
    isFetching,
    error,
  }: {
    data: ResponseData;
    isFetching: boolean;
    error: Error | null;
  } = useGetQuestions(quiz_type, page);
  const { results, count } = data;

  const { mutation } = useSaveScore();

  let totalQuestionsCount = count || 0;
  const handleChange = (id: string, answer: string, correctAnswer: string) => {
    dispatch(chooseAnswer({ id, answer, correctAnswer }));
  };

  const handleSubmitQuiz = async () => {
    console.log(totalQuestionsCount, { questionsAnsweredCount });

    if (count !== questionsAnsweredCount) {
      return;
    }

    let scoreCount = 0;
    for (let answeredQuestion of answeredQuestions) {
      if (answeredQuestion.answer === answeredQuestion.correctAnswer) {
        scoreCount++;
      }
    }
    const quizParamsArray = quiz_type?.split("&");
    const requestBody: Record<string, string> = {};

    for (let param of quizParamsArray as []) {
      let paramName = param.split("=");
      requestBody[paramName[0]] = paramName[1] ? paramName[1] : "Any";
    }
    mutation.mutateAsync(
      quiz_type === "quick-quiz"
        ? {
            category: "Any",
            type: "Any",
            difficulty: "Any",
            userId,
            score: scoreCount,
            questionsCount: totalQuestionsCount,
          }
        : {
            ...requestBody,
            userId,
            score: scoreCount,
            questionsCount: totalQuestionsCount,
          }
    );
    setTotalScore(scoreCount);
  };

  React.useEffect(() => {
    dispatch(reset());
    setTotalScore(undefined);
    setQuestions(results);
  }, []);

  console.log({ results, questions, page, count, error });
  return totalScore === undefined ? (
    <div className="rounded-lg px-3 pt-7 pb-3 bg-[#37373e] text-white ">
      {isFetching
        ? "Loading..."
        : error
        ? "Something unexpected Happened."
        : questions.map((question, index) => {
            return (
              <div className="mb-7" key={question.id}>
                <h2 className="text-lg">
                  {questions.length * page -
                    4 +
                    index +
                    ". " +
                    question.question}
                </h2>
                <div className="px-4">
                  {question.answers.map((answer) => {
                    return (
                      <div
                        className="space-x-3 hover:text-[#fe9d73] "
                        key={answer}
                      >
                        <input
                          type="radio"
                          id={answer}
                          name={question.id}
                          value={answer}
                          className="hover:cursor-pointer"
                          onChange={() =>
                            handleChange(
                              question.id,
                              answer,
                              question.correctAnswer
                            )
                          }
                        />{" "}
                        <label
                          htmlFor={answer}
                          className="hover:cursor-pointer"
                        >
                          {answer}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      <div className="flex flex-row-reverse justify-between items-start">
        <div className=" pt-5 pb-3 space-x-3">
          {page > 1 && (
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="text-center bg-[#fe9d73] rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black disabled:bg-[#b8907e]"
              disabled={page === 1}
            >
              Prev
            </button>
          )}{" "}
          {page * 5 < count && (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="text-center disabled:bg-[#b8907e] bg-[#fe9d73] rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black"
              disabled={page * 5 === count}
            >
              Next
            </button>
          )}
        </div>
        <div className="pt-5 pb-3">
          {page * 5 === count && (
            <button
              onClick={handleSubmitQuiz}
              className="text-center bg-[#fe9d73] rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <QuizResult score={totalScore || 0} questionsCount={totalQuestionsCount} />
  );
};

export default QuizInterface;
