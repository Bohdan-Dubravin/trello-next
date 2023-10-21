import { api } from "@/core/api";
import { Boards } from "@prisma/client";
import { CreateBoardDto } from "@/app/api/boards/dto";

const boardsService = {
  async getBoards() {
    const { data } = await api.get<Boards[]>("/api/boards");

    return data;
  },

  async getBoardById(id: string) {
    const { data } = await api.get<Boards>(`/api/boards/${id}`);

    return data;
  },

  async createBoard(board: CreateBoardDto) {
    const { data } = await api.post<Boards>("/api/boards", board);

    return data;
  },
};

export default boardsService;
