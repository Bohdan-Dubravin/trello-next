import { InputComponent } from "@/components/ui/InputComponent/InputComponent";
import { useCreateColumn } from "@/lib/hooks/columns/useCreateColumn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const createColumnSchema = z.object({
  title: z.string().min(3).max(20),
  board_id: z.string().uuid(),
  width: z.number().min(50).optional().default(50),
});

type createBoardValues = z.infer<typeof createColumnSchema>;

const CreateColumn = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createBoardValues>({
    resolver: zodResolver(createColumnSchema),
  });
  const { mutateAsync, isPending } = useCreateColumn();

  const onSubmit = handleSubmit(async (values) => {
    await mutateAsync(values);
    setIsFormOpen(false);
  });

  const openForm = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {isFormOpen ? (
        <form onSubmit={onSubmit}>
          <InputComponent
            error={errors.title?.message}
            placeholder="Board title"
            disabled={isPending}
            {...register("title")}
          />
        </form>
      ) : (
        <h5
          onClick={openForm}
          className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          + Create Board
        </h5>
      )}
    </div>
  );
};

export default CreateColumn;