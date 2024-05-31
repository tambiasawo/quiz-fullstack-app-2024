import React, { useContext, createContext } from "react";

type AnsweredQuestion = {
  id: string;
  answer: string;
  correctAnswer: string;
};
interface AnswerContextType {
  answeredQuestions: Array<AnsweredQuestion>;
  questionsAnsweredCount: number;
  chooseAnswer: (param: AnsweredQuestion) => void;
}

export const AnswerContext = createContext<AnswerContextType>({
  answeredQuestions: [],
  questionsAnsweredCount: 0,
  chooseAnswer() {
    throw new Error("Context not initialized");
  },
});

export const useAnswerContext = () => useContext(AnswerContext);
interface Props {
  children: React.ReactNode;
}
export const AnswerContextProvider = ({ children }: Props) => {
  const [answeredQuestions, setAnsweredQuestions] = React.useState<
    AnsweredQuestion[]
  >([]);
  const [questionsAnsweredCount, setQuestionsAnsweredCount] = React.useState(0);

  const chooseAnswer = (param: {
    id: string;
    answer: string;
    correctAnswer: string;
  }) => {
    let temp = answeredQuestions;
    const existingQuestionIndex = temp.findIndex(
      (question) => question.id === param.id
    );
    if (existingQuestionIndex !== -1) {
      const existingQuestion = temp[existingQuestionIndex];
      const newAnswer = {
        ...existingQuestion,
        answer: param.answer,
      };
      temp[existingQuestionIndex] = newAnswer;

      setAnsweredQuestions(temp);
    } else {
      temp.push(param);
      setAnsweredQuestions(temp);
      setQuestionsAnsweredCount((prev) => prev + 1);
    }
  };

  return (
    <AnswerContext.Provider
      value={{ answeredQuestions, chooseAnswer, questionsAnsweredCount }}
    >
      {children}
    </AnswerContext.Provider>
  );
};
