import { Boards } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import boardsService from "../../services/boardsService";

interface UseBoardsOptions {
  initialData: Boards;
  id: string;
}

export const useBoard = ({ initialData, id }: UseBoardsOptions) => {
  const query = useQuery({
    queryKey: ["board"],
    queryFn: () => boardsService.getBoardById(id),
    initialData,
  });

  return query;
};
