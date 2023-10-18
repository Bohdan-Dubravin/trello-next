import { NextResponse } from "next/server";
import { createBoardDto } from "./dto";
import { prisma } from "@/core/prisma";

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
