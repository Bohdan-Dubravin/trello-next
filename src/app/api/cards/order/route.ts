import { NextResponse } from "next/server";

import { prisma } from "@/core/prisma";
import { updateCardOrderDto } from "../dto";

export async function PATCH(req: Request) {
  const body = await req.json();
  const validateBody = updateCardOrderDto.safeParse(body);
  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const updatedCards = validateBody.data.map(({ id, order }) =>
    prisma.cards.update({ where: { id }, data: { order } })
  );

  await prisma.$transaction(updatedCards);
  return NextResponse.json({}, { status: 200 });
}
