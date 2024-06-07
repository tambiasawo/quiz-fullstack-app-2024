import { useQuery } from "@tanstack/react-query";
//import { GET as getQuestions } from "./query";

const getQuizQuestions = async (quiz_type: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/quiz/?${quiz_type}`
    );
    const responseData = await response.json();

    return responseData.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const useGetQuestions = (quiz_type: string | undefined) => {
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuizQuestions(quiz_type as string),
  });

  return { data, isFetching, error, isPending };
};

export default useGetQuestions;
