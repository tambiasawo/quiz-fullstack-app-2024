import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { chooseAnswer, reset } from "../store/features/question/questionSlice";
import QuizResult from "./QuizResult";
import { Question } from "../hooks/useQuestions";
import { useSaveScore } from "../hooks/useScores";
import { useSaveMarks } from "../hooks/useMarks";
import { Skeleton, Tooltip } from "@mui/material";
import { unstable_usePrompt } from "react-router-dom";

interface ResponseData {
  data: Question[];
  isFetching: boolean;
  error: Error | null;
  count: number;
}

export type Marks = {
  id: string;
  answer: string;
  question: string;
  correctAnswer: string;
};

const QuizInterface = ({
  responseData,
  urlParams,
  page,
  nextPageHandler,
  prevPageHandler,
}: {
  responseData: ResponseData;
  urlParams: string | undefined;
  page: number;
  nextPageHandler: () => void;
  prevPageHandler: () => void;
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const { answeredQuestions, questionsAnsweredCount } = useSelector(
    (state: RootState) => state.question
  );
  const { isFetching, data, error, count } = responseData;
  const parser = new DOMParser();

  const [totalScore, setTotalScore] = React.useState<number | undefined>(
    undefined
  );

  const { mutation: saveScore } = useSaveScore();
  const { mutation: saveMarks } = useSaveMarks();
  const totalQuestionsCount = count || 0;

  const handleChange = (
    id: string,
    question: string,
    answer: string,
    correctAnswer: string
  ) => {
    dispatch(chooseAnswer({ id, question, answer, correctAnswer }));
  };

  const handleSubmitQuiz = async () => {
    if (count !== questionsAnsweredCount) {
      return;
    }

    let scoreCount = 0;
    const marksId = uuidv4();

    for (let answeredQuestion of answeredQuestions) {
      if (answeredQuestion.answer === answeredQuestion.correctAnswer) {
        scoreCount++;
      }
    }

    const requestBody = {
      ...(urlParams === "quick-quiz"
        ? { category: "Any", type: "Any", difficulty: "Any" }
        : urlParams?.split("&").reduce((acc, param) => {
            const [key, value] = param.split("=");
            acc[key] = value ? value : "Any";
            return acc;
          }, {} as Record<string, string>)),
      userId,
      score: scoreCount,
      questionsCount: totalQuestionsCount,
      marksId,
    };

    await saveScore.mutateAsync(requestBody);
    await saveMarks.mutateAsync({ marks: answeredQuestions, marksId });

    setTotalScore(scoreCount);
    dispatch(reset());
  };

  React.useEffect(() => {
    dispatch(reset());
    setTotalScore(undefined);
  }, []);

  unstable_usePrompt({
    message: "Are you sure ? Once you leave, the quiz will end",
    when: ({ currentLocation, nextLocation }) =>
      totalScore === undefined &&
      currentLocation.pathname !== nextLocation.pathname,
  });
  if (isFetching) {
    return (
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={"100vh"}
        animation="wave"
        className="skeleton-class mx-auto"
      />
    );
  }
  return totalScore === undefined ? (
    <div className="rounded-lg px-3 pt-3 pb-3 bg-[#37373e] text-white ">
      {error ? (
        <p className="text-center">{error.message}</p>
      ) : (
        <>
          <div className="flex justify-end text-green-500">
            <Tooltip title="Coming Soon...">
              <h2> Timer: 00:00:00</h2>
            </Tooltip>
          </div>
          {data.map((question, index) => (
            <div className="mb-7" key={question.id}>
              <h2 className="text-lg">
                {data.length * page -
                  4 +
                  index +
                  ". " +
                  parser.parseFromString(
                    decodeURIComponent(question.question),
                    "text/html"
                  ).body.textContent}
              </h2>
              <div className="px-4">
                {question.answers.map((answer, index) => (
                  <div className="space-x-3 hover:text-[#fe9d73] " key={index}>
                    <input
                      type="radio"
                      id={`${question.id}-${index}`}
                      name={question.id}
                      value={answer}
                      className="hover:cursor-pointer"
                      onChange={() =>
                        handleChange(
                          question.id,
                          question.question,
                          answer,
                          question.correctAnswer
                        )
                      }
                      checked={answeredQuestions.some(
                        (q: { id: string; answer: string; question: string }) =>
                          q.id === question.id &&
                          q.answer === answer &&
                          q.question === question.question
                      )}
                    />{" "}
                    <label
                      htmlFor={`${question.id}-${index}`}
                      className="hover:cursor-pointer"
                    >
                      {
                        parser.parseFromString(
                          decodeURIComponent(answer),
                          "text/html"
                        ).body.textContent
                      }
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-row-reverse justify-between items-start">
            <div className="pt-5 pb-3 space-x-3">
              {page > 1 && (
                <button
                  onClick={prevPageHandler}
                  className="text-center bg-[#fe9d73] rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black disabled:bg-[#b8907e]"
                  disabled={page === 1}
                >
                  Prev
                </button>
              )}{" "}
              {!(page * 5 === count) && (
                <button
                  onClick={nextPageHandler}
                  className="text-center disabled:bg-[#b8907e] bg-[#fe9d73] rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black"
                >
                  Next
                </button>
              )}
            </div>
            <div className="pt-5 pb-3">
              <button
                onClick={handleSubmitQuiz}
                className="text-center bg-[#fe9d73] disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black"
                disabled={questionsAnsweredCount !== count}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <QuizResult score={totalScore} questionsCount={totalQuestionsCount} />
  );
};

export default QuizInterface;
