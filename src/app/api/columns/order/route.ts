import { NextResponse } from "next/server";

import { prisma } from "@/core/prisma";
import { updateColumnOrderDto } from "../dto";

export async function PUT(req: Request) {
  const body = await req.json();
  const validateBody = updateColumnOrderDto.safeParse(body);
  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const updatedColumns = validateBody.data.map(({ id, order }) =>
    prisma.columns.update({ where: { id }, data: { order } })
  );

  await prisma.$transaction(updatedColumns);
  return NextResponse.json({}, { status: 200 });
}
