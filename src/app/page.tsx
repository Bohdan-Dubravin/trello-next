import { BoardsList } from "@/components/BoardsList";
import { NavBar } from "../components/NavBar";
import { prisma } from "@/core/prisma";
import boardsService from "@/lib/services/boards";

export default async function Home() {
  const boards = await boardsService.getBoards();

  return (
    <div>
      <NavBar />
      <BoardsList initialData={boards} />
    </div>
  );
}
