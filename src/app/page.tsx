import { BoardsList } from "@/components/Board";

import boardsService from "@/lib/services/boards";

export default async function Home() {
  const boards = await boardsService.getBoards();

  return (
    <div>
      <BoardsList initialData={boards} />
    </div>
  );
}
