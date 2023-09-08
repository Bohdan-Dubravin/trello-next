import { NextResponse } from "next/server";
import { createBoardDto } from "./dto";
import { prisma } from "@/app/core/prisma";
import { data } from "autoprefixer";

export async function GET() {
  const boards = await prisma.boards.findMany();

  return NextResponse.json(boards);
}

export async function POST(req: Request) {
  const body = await req.json();
  const validateBody = createBoardDto.safeParse(body);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const { title } = validateBody.data;

  const newBoard = await prisma.boards.create({ data: { title } });
  return NextResponse.json(newBoard);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const existBoard = prisma.boards.findFirst(body.id);
  if (!existBoard) {
    return NextResponse.json(
      { error: "Board with id: " + body.id + " not exist" },
      { status: 404 }
    );
  }

  const updatedBoard = prisma.boards.update({
    where: { id: body.id },
    data: { title: body.title },
  });

  return NextResponse.json(updatedBoard);
}
