import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Marks } from "../components/QuizInterface";

const saveMarks = async (params: { marks: Marks[]; marksId: string }) => {
  try {
    await fetch(`http://localhost:3000/api/marks/save-marks`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
  } catch (e) {
    console.log(e);
  }
};

const getMark = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/marks/get-mark/${id}`
    );
    const responseData = await response.json();
    if (responseData.success) return responseData.results[0].marks;
    return responseData.results;
  } catch (err) {
    console.log(err);
  }
};

const useSaveMarks = () => {
  const queryClient = new QueryClient();
  const mutation = useMutation({
    mutationFn: saveMarks,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["save-marks"] });
    },
  });
  return { mutation };
};

const useGetMark = (id: string) => {
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["marks", id],
    queryFn: () => getMark(id),
  });

  return { data, isFetching, error, isPending };
};

export { useSaveMarks, useGetMark };
