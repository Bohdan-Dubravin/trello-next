import { api } from "@/core/api";
import { prisma } from "@/core/prisma";
import { Boards } from "@prisma/client";

const boardsService = {
  async getBoards() {
    const { data } = await api.get<Boards[]>("/api/boards");

    return data;
  },
};

export default boardsService;
