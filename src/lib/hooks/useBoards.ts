import { Boards } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import boardsService from "../services/boards";

interface UseBoardsOptions {
  initialData: Boards[];
}

export const useBoards = ({ initialData }: UseBoardsOptions) => {
  const query = useQuery({
    queryKey: ["boards"],
    queryFn: boardsService.getBoards,
    initialData,
  });

  return query;
};
