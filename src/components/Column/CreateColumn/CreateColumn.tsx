"use client";
import { InputComponent } from "@/components/ui/InputComponent/InputComponent";
import { useCreateColumn } from "@/lib/hooks/columns/useCreateColumn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const createColumnSchema = z.object({
  title: z.string().min(3).max(20),
});

type createColumnValues = z.infer<typeof createColumnSchema>;

interface CreateColumnProps {
  boardId: string;
}

const CreateColumn = ({ boardId }: CreateColumnProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createColumnValues>({
    resolver: zodResolver(createColumnSchema),
  });
  const { mutateAsync, isPending } = useCreateColumn(boardId);

  const onSubmit = handleSubmit(async (values) => {
    await mutateAsync({ ...values, board_id: boardId });
    setIsFormOpen(false);
  });

  const openForm = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="block cursor-pointer w-60  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {isFormOpen ? (
        <form onSubmit={onSubmit}>
          <InputComponent
            error={errors.title?.message}
            placeholder="Column title"
            disabled={isPending}
            {...register("title")}
          />
        </form>
      ) : (
        <h5
          onClick={openForm}
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          + Create Column
        </h5>
      )}
    </div>
  );
};

export default CreateColumn;
