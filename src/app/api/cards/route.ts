import { NextResponse } from "next/server";
import { createCardDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const column_id = searchParams.get("column_id");
  if (!column_id) {
    return NextResponse.json(
      [
        {
          code: "missing query param",
          field: "column_id",
          message: "column_id in query params is required",
        },
      ],
      { status: 400 }
    );
  }

  const cards = await prisma.cards.findMany({
    where: { column_id },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(cards);
}

export async function POST(req: Request) {
  const body = await req.json();
  const validateBody = createCardDto.safeParse(body);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const { title, column_id } = validateBody.data;

  const lastCard = await prisma.cards.findFirst({
    where: { column_id },
    orderBy: { order: "desc" },
  });

  const newCard = await prisma.cards.create({
    data: {
      title,
      column_id,
      order: lastCard ? lastCard.order + 1 : 0,
    },
  });

  return NextResponse.json(newCard);
}
