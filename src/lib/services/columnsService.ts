import { api } from "@/core/api";
import { Columns } from "@prisma/client";
import { CreateColumnDto } from "@/app/api/columns/dto";

const columnsService = {
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
