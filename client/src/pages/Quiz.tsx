import React from "react";
import QuizInterface from "../components/QuizInterface";
import { AnswerContextProvider } from "../store/context/AnswerContext";
const Quiz = () => {
  return (
    <AnswerContextProvider>
      {" "}
      <QuizInterface />
    </AnswerContextProvider>
  );
};

export default Quiz;
