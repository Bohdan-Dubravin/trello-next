import { NextResponse } from "next/server";

import { prisma } from "@/app/core/prisma";
import { updateCardDto } from "../dto";

interface CardRouteContext {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params }: CardRouteContext) {
  const { id } = params;
  const body = await req.json();
  const validateBody = updateCardDto.safeParse(body);
  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const existCard = await prisma.cards.findUnique({ where: { id } });
  if (!existCard) {
    return NextResponse.json(
      [{ code: "not_found", messages: "Card not found" }],
      { status: 400 }
    );
  }

  const updatedCard = await prisma.cards.update({
    where: { id },
    data: validateBody.data,
  });

  return NextResponse.json(updatedCard);
}

export async function DELETE(req: Request, { params }: CardRouteContext) {
  const { id } = params;
  const existCard = await prisma.cards.findUnique({ where: { id } });
  if (!existCard) {
    return NextResponse.json(
      [{ code: "not_found", message: "Card not found" }],
      { status: 400 }
    );
  }

  await prisma.cards.delete({
    where: { id },
  });

  return NextResponse.json({}, { status: 200 });
}
