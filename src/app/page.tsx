import { prisma } from "@/core/prisma";
import { BoardCard } from "../components/BoardCards";
import { NavBar } from "../components/NavBar";

export default async function Home() {
  const boards = await prisma.boards.findMany();
  return (
    <div>
      <NavBar />
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:grid-cols-5 px-4 lg:px-12">
        {boards.map((board) => {
          return <BoardCard id={board.id} title={board.title} />;
        })}
      </div>
    </div>
  );
}
