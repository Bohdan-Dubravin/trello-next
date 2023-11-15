import { api } from "@/core/api";
import { Columns } from "@prisma/client";
import { CreateColumnDto } from "@/app/api/columns/dto";
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
};

export default columnsService;
