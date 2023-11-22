import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateColumnDto } from "@/app/api/columns/dto";
import columnsService from "../../services/columnsService";
import { BoardPayload } from "@/lib/types/boardPayload.type";
import { ColumnPayload } from "./useGetColumn";

export const useUpdateColumn = (columnId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-column", columnId],
    mutationFn: async (column: CreateColumnDto) =>
      columnsService.createColumn(column),
    onSuccess: (newColumn) => {
      const data = queryClient.getQueryData<ColumnPayload>([
        "column",
        columnId,
      ]);
      const column = [...data!.columns] || [];

      // columns.push({ ...newColumn, cards: [] });

      queryClient.setQueryData<ColumnPayload>(["column", columnId], (old) => ({
        ...old!,
        column,
      }));
    },
  });

  return mutation;
};
