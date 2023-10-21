import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useColumnQueryKey } from "./useGetColumns";
import { CreateColumnDto } from "@/app/api/columns/dto";
import columnsService from "../../services/columnsService";

export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-column"],
    mutationFn: async (column: CreateColumnDto) =>
      columnsService.createColumn(column),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [useColumnQueryKey] });
    },
  });

  return mutation;
};
