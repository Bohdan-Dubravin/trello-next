"use client";

import { useBoard } from "@/lib/hooks/boards/useGetBoard";
import { BoardPayload } from "@/lib/types/boardPayload.type";
import CreateColumn from "../CreateColumn/CreateColumn";
import Column from "../Column/Columns";

interface ColumnListProps {
  board: BoardPayload;
}

const ColumnList = ({ board }: ColumnListProps) => {
  const { data } = useBoard({ initialData: board });

  return (
    <ul className="flex flex-1 gap-4 px-6 pb-5 w-full h-content overflow-x-scroll">
      {data.columns.map((column) => {
        return <Column key={column.id} column={column} />;
      })}

      <CreateColumn boardId={board.id} />
    </ul>
  );
};

export default ColumnList;
