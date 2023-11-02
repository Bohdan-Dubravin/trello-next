import { Columns } from "@prisma/client";
import { DragEvent, useRef, useState } from "react";

interface ColumnsProps {
  column: Columns;
}
const MIN_WIDTH = 200;
const Column = ({ column }: ColumnsProps) => {
  const [width, setWidth] = useState(column.width);
  const initialDragX = useRef<number>(0);
  const onResizeStart = (e: DragEvent<HTMLDivElement>) => {};

  const onResize = (e: DragEvent<HTMLDivElement>) => {
    if (e.clientX === 0) return;

    const movedBy = e.clientX - initialDragX.current;
    initialDragX.current = e.clientX;
    setWidth((width) => {
      const newWidth = width + movedBy;
      if (newWidth < MIN_WIDTH) return MIN_WIDTH;

      return newWidth;
    });

    const onResizeEnd = async () => {
      // await mutateAsync({ columnId: data.id, data: { width } });
    };
  };
  return (
    <li
      style={{ minWidth: width, width }}
      className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="relative">
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {column.title}
        </h5>
        <div
          className="absolute right-0 top-0"
          onDragStart={onResizeStart}
          onDrag={onResize}
          onDragEnd={onResizeEnd}
        >
          move
        </div>
      </div>
    </li>
  );
};

export default Column;
