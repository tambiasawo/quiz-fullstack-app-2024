import { useMutation, useQueryClient } from "@tanstack/react-query";

export const GET = async (quiz_type: string) => {
  const response = await fetch(`http://localhost:3000/api/quiz/?${quiz_type}`);
  const responseData = await response.json();
  return responseData;
};

// Queries

// Mutations
/* const mutation = useMutation({
  mutationFn: postTodo,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
}); */
