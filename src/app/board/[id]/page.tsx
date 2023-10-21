import { prisma } from "@/core/prisma";
import { notFound } from "next/navigation";

interface BoardPageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const board = await prisma.boards.findUnique({ where: { id: params.id } });

  if (!board) notFound();

  return (
    <div className="container mx-auto ">
      <h1 className="text-white text-4xl text-center mb-8">{board.title}</h1>
      <div className="flex h-full">
        <div className="block h-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            avgasss
          </h5>
        </div>
      </div>
    </div>
  );
}
