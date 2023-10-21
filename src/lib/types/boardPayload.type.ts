import { Prisma } from "@prisma/client";

export type BoardPayload = Prisma.BoardsGetPayload<{
  include: { columns: { include: { Cards: true } } };
}>;
