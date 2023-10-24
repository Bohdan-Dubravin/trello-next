import ColumnList from "@/components/Column/ColumnList/ColumnList";

import boardsService from "@/lib/services/boardsService";
import { notFound } from "next/navigation";

interface BoardPageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const board = await boardsService.getBoardById(params.id);

  if (!board) notFound();

  return (
    <>
      <div className="container mx-auto w-full">
        <h1 className="text-white text-4xl text-center mb-8">{board.title}</h1>
      </div>
      <ColumnList board={board} />
    </>
  );
}
