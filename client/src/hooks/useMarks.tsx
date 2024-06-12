import { QueryClient, useMutation } from "@tanstack/react-query";
import { Marks } from "../components/QuizInterface";

const saveMarks = async (params: {
  userId?: string;
  marks: Marks[];
  scoreCount: number;
}) => {
  try {
    if (!params.userId) {
      throw new Error();
    }
    await fetch(`http://localhost:3000/api/marks/save-marks`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
  } catch (e) {
    console.log(e);
  }
};

const useMarks = () => {
  const queryClient = new QueryClient();
  const mutation = useMutation({
    mutationFn: saveMarks,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["save-scores"] });
    },
  });
  return { mutation };
};

export default useMarks;
