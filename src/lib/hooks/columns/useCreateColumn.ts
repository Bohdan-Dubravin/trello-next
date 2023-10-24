import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateColumnDto } from "@/app/api/columns/dto";
import columnsService from "../../services/columnsService";
import { BoardPayload } from "@/lib/types/boardPayload.type";

export const useCreateColumn = (boardId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-column"],
    mutationFn: async (column: CreateColumnDto) =>
      columnsService.createColumn(column),
    onSuccess: (newColumn) => {
      const data = queryClient.getQueryData<BoardPayload>(["board", boardId]);
      const columns = [...data?.columns!] || [];

      columns.push({ ...newColumn, cards: [] });

      queryClient.setQueryData<BoardPayload>(["board", boardId], (old) => ({
        ...old!,
        columns,
      }));
    },
  });

  return mutation;
};
