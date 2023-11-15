import { NextResponse } from "next/server";

import { prisma } from "@/core/prisma";
import { updateColumnDto } from "../dto";

interface ColumnRouteContext {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: ColumnRouteContext) {
  const { id } = params;

  const column = await prisma.columns.findUnique({
    where: { id },
    include: { Cards: true },
  });

  if (!column) {
    return NextResponse.json(
      [{ code: "not found", messages: "column not found" }],
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(column);
}

export async function PUT(req: Request, { params }: ColumnRouteContext) {
  const { id } = params;
  const body = await req.json();
  const validateBody = updateColumnDto.safeParse(body);
  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const existColumn = await prisma.columns.findUnique({ where: { id } });
  if (!existColumn) {
    return NextResponse.json(
      [{ code: "not_found", messages: "Column not found" }],
      { status: 400 }
    );
  }

  const updatedColumn = await prisma.columns.update({
    where: { id },
    data: validateBody.data,
  });

  return NextResponse.json(updatedColumn);
}

export async function DELETE(req: Request, { params }: ColumnRouteContext) {
  const { id } = params;
  const existColumn = await prisma.columns.findUnique({ where: { id } });
  if (!existColumn) {
    return NextResponse.json(
      [{ code: "not_found", message: "Column not found" }],
      { status: 400 }
    );
  }

  await prisma.columns.delete({
    where: { id },
  });

  return NextResponse.json({}, { status: 200 });
}
