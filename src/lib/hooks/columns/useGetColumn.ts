import { api } from "@/core/api";
import columnsService from "@/lib/services/columnsService";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export type ColumnPayload = Prisma.ColumnsGetPayload<{
  include: { Cards: true };
}>;

interface useColumnQUeryOptions {
  initialData: ColumnPayload;
}

export const useColumnQuery = ({ initialData }: useColumnQUeryOptions) => {
  const query = useQuery<ColumnPayload>({
    queryKey: ["column", initialData.id],
    queryFn: () => columnsService.getColumn(initialData.id),
    initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};
