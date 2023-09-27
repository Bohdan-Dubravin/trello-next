import { NextResponse } from "next/server";
import { updateBoardDto } from "../dto";
import { prisma } from "@/app/core/prisma";

interface BoardRouteContext {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params }: BoardRouteContext) {
  const { id } = params;
  const body = await req.json();
  const validateBody = updateBoardDto.safeParse(body);
  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const existBoard = await prisma.boards.findUnique({ where: { id } });
  if (!existBoard) {
    return NextResponse.json(
      [{ code: "not_found", messages: "Board not found" }],
      { status: 400 }
    );
  }

  const updatedBoard = await prisma.boards.update({
    where: { id },
    data: validateBody.data,
  });

  return NextResponse.json(updatedBoard);
}

export async function DELETE(req: Request, { params }: BoardRouteContext) {
  const { id } = params;
  const existBoard = await prisma.boards.findUnique({ where: { id } });
  if (!existBoard) {
    return NextResponse.json(
      [{ code: "not_found", message: "Board not found" }],
      { status: 400 }
    );
  }
  await prisma.boards.delete({
    where: { id },
  });

  return NextResponse.json({}, { status: 200 });
}
