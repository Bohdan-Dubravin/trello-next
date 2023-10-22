"use client";

import { useBoard } from "@/lib/hooks/boards/useGetBoard";
import { BoardPayload } from "@/lib/types/boardPayload.type";

interface ColumnListProps {
  board: BoardPayload;
}

const ColumnList = ({ board }: ColumnListProps) => {
  const { data } = useBoard({ initialData: board });

  if (!data.columns.length) {
    return <div>not found</div>;
  }
  return (
    <ul className="flex flex-1 gap-4 px-6 pb-5 w-full h-content overflow-x-scroll">
      {data.columns.map((column) => {
        return (
          <>
            <li
              key={column.id}
              style={{ minWidth: column.width, width: column.width }}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {column.title}
                </h5>
              </div>
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default ColumnList;
