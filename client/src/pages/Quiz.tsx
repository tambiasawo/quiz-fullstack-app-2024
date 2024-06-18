import React from "react";
import { useParams } from "react-router-dom";
import useGetQuestions, { Question } from "../hooks/useQuestions";

interface ResponseData {
  results: Question[];
  count: number;
}

function handleReload(event: { returnValue: string }) {
  const message =
    "Are you sure you want to leave this page? Any unsaved changes will be lost.";
  event.returnValue = message; // Standard
  return message; // For some browsers
}

import QuizInterface from "../components/QuizInterface";
const Quiz = () => {
  const { quiz_type } = useParams();
  const [page, setPage] = React.useState(1);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  const {
    data = { results: [], count: 0 },
    isFetching,
    error,
  }: {
    data: ResponseData;
    isFetching: boolean;
    error: Error | null;
  } = useGetQuestions(quiz_type);

  const paginatedResults = data.results?.slice((page - 1) * 5, page * 5);

  React.useEffect(() => {
    window.addEventListener("beforeunload", handleReload);

    return () => {
      window.removeEventListener("beforeunload", handleReload);
    };
  }, []);
  return (
    <QuizInterface
      responseData={{
        data: paginatedResults,
        isFetching,
        error,
        count: data.count,
      }}
      urlParams={quiz_type}
      page={page}
      nextPageHandler={handleNextPage}
      prevPageHandler={handlePrevPage}
    />
  );
};

export default Quiz;
