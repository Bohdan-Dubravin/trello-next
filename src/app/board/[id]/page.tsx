import { prisma } from "@/core/prisma";
import boardsService from "@/lib/services/boardsService";
import { notFound } from "next/navigation";

interface BoardPageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const board = await boardsService.getBoardById(params.id);

  if (!board) notFound();

  return (
    <div className="container mx-auto w-full h-content">
      <h1 className="text-white text-4xl text-center mb-8">{board.title}</h1>
      <div className="flex h-full flex-1">
        <div className="block w-full  p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
          <div>
            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Column name
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
