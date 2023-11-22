import { z } from "zod";
export const createColumnDto = z.object({
  title: z.string().min(1).max(20),
  board_id: z.string().uuid(),
  width: z.number().min(50).default(200).optional(),
});

export type CreateColumnDto = z.infer<typeof createColumnDto>;

export const updateColumnDto = createColumnDto
  .omit({ board_id: true })
  .partial();
export type UpdateColumnDto = z.infer<typeof updateColumnDto>;
export const updateColumnOrderDto = z.array(
  z.object({ id: z.string().uuid(), order: z.number().nonnegative() })
);
