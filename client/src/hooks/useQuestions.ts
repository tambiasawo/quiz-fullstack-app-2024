import { useQuery } from "@tanstack/react-query";

export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  category: string;
  type: string;
  difficulty: string;
}

const getQuizQuestions = async (quiz_type: string) => {
  try {
    const response = await fetch(`/api/quiz/?${quiz_type}`);
    const responseData = await response.json();
    if (!responseData.success) {
      throw new Error("Could not fetch questions. Please try again");
    }
    return responseData.data;
  } catch (err) {
    throw new Error("Could not fetch questions. Please try again");
  }
};

const useGetQuestions = (quiz_type: string | undefined) => {
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["questions"],
    //staleTime: 60 * 1000 * 5,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    queryFn: () => getQuizQuestions(quiz_type as string),
  });
  return { data, isFetching, error, isPending };
};

export default useGetQuestions;
