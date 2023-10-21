"use client";
import { useQuery } from "@tanstack/react-query";
import boardsService from "../../services/boardsService";
import { BoardPayload } from "@/lib/types/boardPayload.type";

interface UseBoardsOptions {
  initialData: BoardPayload;
}

export const useBoard = ({ initialData }: UseBoardsOptions) => {
  const query = useQuery({
    queryKey: ["board", initialData.id],
    queryFn: () => boardsService.getBoardById(initialData.id),
    initialData,
  });

  return query;
};
