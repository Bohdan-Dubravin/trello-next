import { BoardsList } from "@/components/Boards";
import { NavBar } from "../components/NavBar";
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
