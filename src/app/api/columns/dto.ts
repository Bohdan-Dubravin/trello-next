import { z } from "zod";
export const createCardDto = z.object({
  title: z.string().min(1).max(20),
  column_id: z.string().uuid(),
  description: z.string().optional(),
});

export const updateColumnDto = createCardDto
  .omit({ column_id: true })
  .partial();

export const updateColumnOrderDto = z.array(
  z.object({ id: z.string().uuid(), order: z.number().nonnegative() })
);
