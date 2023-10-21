import { useMutation, useQueryClient } from "@tanstack/react-query";
import boardsService from "../../services/boardsService";
import { CreateBoardDto } from "@/app/api/boards/dto";
import { useBoardQueryKey } from "./useGetBoards";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-board"],
    mutationFn: async (board: CreateBoardDto) =>
      boardsService.createBoard(board),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [useBoardQueryKey] });
    },
  });

  return mutation;
};
