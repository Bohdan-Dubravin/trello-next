import { Columns } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import columnsService from "../../services/columnsService";

interface UseColumnsOptions {
  initialData: Columns[];
}

export const useColumnQueryKey = "columns";

export const useColumns = ({ initialData }: UseColumnsOptions) => {
  const query = useQuery({
    queryKey: [useColumnQueryKey],
    queryFn: columnsService.getColumns,
    initialData,
  });

  return query;
};
