import { Boards } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import boardsService from "../../services/boardsService";

interface UseBoardsOptions {
  initialData: Boards[];
}

export const useBoardQueryKey = "boards";

export const useBoards = ({ initialData }: UseBoardsOptions) => {
  const query = useQuery({
    queryKey: [useBoardQueryKey],
    queryFn: boardsService.getBoards,
    initialData,
  });

  return query;
};
