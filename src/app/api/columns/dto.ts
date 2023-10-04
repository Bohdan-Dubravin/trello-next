import { z } from "zod";
export const createColumnDto = z.object({
  title: z.string().min(1).max(20),
  board_id: z.string().uuid(),
  width: z.number().min(50).optional().default(50),
});

export const updateColumnDto = createColumnDto
  .omit({ board_id: true })
  .partial();

export const updateColumnOrderDto = z.array(
  z.object({ id: z.string().uuid(), order: z.number().nonnegative() })
);
