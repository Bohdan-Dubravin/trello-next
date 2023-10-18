import { NextResponse } from "next/server";
import { createColumnDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const board_id = searchParams.get("board_id");
  if (!board_id) {
    return NextResponse.json(
      [
        {
          code: "missing query param",
          field: "board_id",
          message: "board_id in query params is required",
        },
      ],
      { status: 400 }
    );
  }

  const columns = await prisma.columns.findMany({
    where: { board_id },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(columns);
}

export async function POST(req: Request) {
  const body = await req.json();
  const validateBody = createColumnDto.safeParse(body);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const { title, board_id } = validateBody.data;

  const lastColumn = await prisma.columns.findFirst({
    where: { board_id },
    orderBy: { order: "desc" },
  });

  const newColumn = await prisma.columns.create({
    data: {
      title,
      board_id,
      width: 50,
      order: lastColumn ? lastColumn.order + 1 : 0,
    },
  });

  return NextResponse.json(newColumn);
}
