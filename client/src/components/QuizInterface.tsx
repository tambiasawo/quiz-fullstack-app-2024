import React from "react";
import { v4 as uuidv4 } from "uuid";
import { chooseAnswer, reset } from "../store/features/question/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import QuizResult from "./QuizResult";
import { Question } from "../hooks/useQuestions";
import { useSaveScore } from "../hooks/useScores";
import { Skeleton } from "@mui/material";
import useMarks from "../hooks/useMarks";

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

  const [totalScore, setTotalScore] = React.useState<undefined | number>();

  const { mutation } = useSaveScore();
  const { mutation: saveMarks } = useMarks();
  let totalQuestionsCount = count || 0;

  const handleChange = (
    id: string,
    question: string,
    answer: string,
    correctAnswer: string
  ) => {
    dispatch(chooseAnswer({ id, question, answer, correctAnswer }));
  };

  const handleSaveScore = async (
    scoreCount: number,
    requestBody: Record<string, string>,
    marksId: string
  ) => {
    mutation.mutateAsync(
      urlParams === "quick-quiz"
        ? {
            category: "Any",
            type: "Any",
            difficulty: "Any",
            userId,
            score: scoreCount,
            questionsCount: totalQuestionsCount,
            marksId,
          }
        : {
            ...requestBody,
            userId,
            score: scoreCount,
            questionsCount: totalQuestionsCount,
            marksId,
          }
    );
  };
  console.log({ userId });
  const handleSaveMarks = async (
    userId: string | undefined,
    marks: Marks[],
    scoreCount: number,
    marksId: string
  ) => {
    saveMarks.mutateAsync({ userId, marks, scoreCount, marksId });
  };

  //console.log(page * 5 < count, page, count);
  const handleSubmitQuiz = async () => {
    console.log(totalQuestionsCount, { questionsAnsweredCount });

    if (count !== questionsAnsweredCount) {
      return;
    }

    let scoreCount = 0;
    let marksId = uuidv4();

    for (let answeredQuestion of answeredQuestions) {
      if (answeredQuestion.answer === answeredQuestion.correctAnswer) {
        scoreCount++;
      }
    }
    const quizParamsArray = urlParams?.split("&");
    const requestBody: Record<string, string> = {};

    for (let param of quizParamsArray as any[]) {
      let paramName = param.split("=");
      requestBody[paramName[0]] = paramName[1] ? paramName[1] : "Any";
    }
    await handleSaveScore(scoreCount, requestBody, marksId);
    await handleSaveMarks(userId, answeredQuestions, scoreCount, marksId);
    setTotalScore(scoreCount);
    dispatch(reset());
  };

  React.useEffect(() => {
    dispatch(reset());
    setTotalScore(undefined);
  }, []);

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
  console.log({ questionsAnsweredCount, count });
  return totalScore === undefined ? (
    <div className="rounded-lg px-3 pt-7 pb-3 bg-[#37373e] text-white ">
      {error
        ? "Something unexpected Happened."
        : data.map((question, index) => {
            return (
              <div className="mb-7" key={question.id}>
                <h2 className="text-lg">
                  {data.length * page - 4 + index + ". " + question.question}
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
                              question.question,
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
              onClick={prevPageHandler}
              className="text-center bg-[#fe9d73] rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black disabled:bg-[#b8907e]"
              disabled={page === 1}
            >
              Prev
            </button>
          )}{" "}
          {
            <button
              onClick={nextPageHandler}
              className="text-center disabled:bg-[#b8907e] bg-[#fe9d73] rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black"
              //disabled={page * 5 === count}
            >
              Next
            </button>
          }
        </div>
        <div className="pt-5 pb-3">
          {page * 5 === count && (
            <button
              onClick={handleSubmitQuiz}
              className="text-center bg-[#fe9d73] disabled:bg-gray-400 disabled:cursor-not-allowed  rounded-xl px-4 py-1 text-md hover:opacity-[.9] text-black"
              disabled={questionsAnsweredCount !== count}
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
