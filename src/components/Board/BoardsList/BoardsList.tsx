"use client";

import { Boards } from "@prisma/client";
import { BoardCard } from "@/components/Board";
import { useBoards } from "@/lib/hooks/boards/useGetBoards";
import CreateBoardCard from "../CreacteBoard/CreateBoard";

interface BoardsListProps {
  initialData: Boards[];
}

const BoardsList = ({ initialData }: BoardsListProps) => {
  const { data: boards } = useBoards({ initialData });
  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:grid-cols-5 px-4 lg:px-12">
      {boards.map((board) => {
        return <BoardCard key={board.id} id={board.id} title={board.title} />;
      })}
      <CreateBoardCard />
    </div>
  );
};

export default BoardsList;
