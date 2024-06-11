import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface QuestionState {
  answeredQuestions: Array<{
    id: string;
    answer: string;
    correctAnswer: string;
  }>;
  questionsAnsweredCount: number;
}

const initialState: QuestionState = {
  answeredQuestions: [],
  questionsAnsweredCount: 0,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    chooseAnswer: (state, action: PayloadAction<any>) => {
      let temp = [...state.answeredQuestions];
      const existingQuestionIndex = temp.findIndex(
        (question) => question.id === action.payload.id
      );
      if (existingQuestionIndex !== -1) {
        const existingQuestion = temp[existingQuestionIndex];
        const newAnswer = {
          ...existingQuestion,
          answer: action.payload.answer,
        };
        temp[existingQuestionIndex] = newAnswer;
        state.answeredQuestions = temp;
        return;
      } else {
        temp.push(action.payload);
        state.answeredQuestions = temp;
        state.questionsAnsweredCount = state.questionsAnsweredCount + 1;
      }
    },
    reset: (state) => {
      state.answeredQuestions = [];
      state.questionsAnsweredCount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { chooseAnswer, reset } = questionSlice.actions;

export default questionSlice.reducer;
