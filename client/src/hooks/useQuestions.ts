import { useQuery } from "@tanstack/react-query";

interface ResponseData {
  results: Question[];
  count: number;
  page: number;
}

export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  category: string;
  type: string;
  difficulty: string;
}

const getQuizQuestions = async (quiz_type: string, page: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/quiz/?${quiz_type}&page=${page}`
    );
    const responseData = await response.json();

    return responseData.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const useGetQuestions = (quiz_type: string | undefined, page: number) => {
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["questions", page],
    staleTime: 60 * 1000 * 10,
    queryFn: () => getQuizQuestions(quiz_type as string, page),
  });

  return { data, isFetching, error, isPending };
};

export default useGetQuestions;
