import { UpdateColumnDto } from "@/app/api/columns/dto";
import columnsService from "@/lib/services/columnsService";
import { useMutation } from "@tanstack/react-query";

export const useUpdateColumnMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: { columnId: string; data: UpdateColumnDto }) =>
      columnsService.updateColumn(data.columnId, data.data),
  });

  return mutation;
};
