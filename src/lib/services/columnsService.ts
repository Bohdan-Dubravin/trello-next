import { api } from "@/core/api";
import { Columns } from "@prisma/client";
import { CreateColumnDto } from "@/app/api/columns/dto";
import { UpdateColumnDto } from "@/app/api/columns/dto";
import { ColumnPayload } from "../hooks/columns/useGetColumn";

const columnsService = {
  async getColumn(columnsId: string) {
    const { data } = await api.get<ColumnPayload>(`/api/columns/${columnsId}`);

    return data;
  },

  async getColumns() {
    const { data } = await api.get<Columns[]>("/api/columns");

    return data;
  },

  async createColumn(column: CreateColumnDto) {
    const { data } = await api.post<Columns>("/api/columns", column);

    return data;
  },

  async updateColumn(columnId: string, data: UpdateColumnDto) {
    const { data: column } = await api.patch<Columns>(
      `/api/columns/${columnId}`,
      data
    );

    return column;
  },
};

export default columnsService;
