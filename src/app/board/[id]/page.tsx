import { prisma } from "@/core/prisma";
import { notFound } from "next/navigation";

interface BoardPageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const board = await prisma.boards.findUnique({ where: { id: params.id } });

  if (!board) notFound();

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-4xl text-center">{board.title}</h1>
    </div>
  );
}
