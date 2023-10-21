import { InputComponent } from "@/components/ui/InputComponent/InputComponent";
import { useCreateBoard } from "@/lib/hooks/boards/useCreateBoard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const createBoardSchema = z.object({ title: z.string().min(3).max(20) });

type createBoardValues = z.infer<typeof createBoardSchema>;

const CreateBoardCard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createBoardValues>({
    resolver: zodResolver(createBoardSchema),
  });
  const { mutateAsync, isPending } = useCreateBoard();

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
          + Create a new Column
        </h5>
      )}
    </div>
  );
};

export default CreateBoardCard;
