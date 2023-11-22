"use client";

import {
  ColumnPayload,
  useColumnQuery,
} from "@/lib/hooks/columns/useGetColumn";
import { useUpdateColumnMutation } from "@/lib/hooks/columns/useUpdateColumnMutation";

import { DragEvent, useEffect, useRef, useState } from "react";

interface ColumnsProps {
  column: ColumnPayload;
}
const MIN_WIDTH = 200;
const Column = ({ column }: ColumnsProps) => {
  const { data } = useColumnQuery({ initialData: column });

  const initialDragX = useRef<number>(0);
  const [width, setWidth] = useState<number>(data.width);
  useEffect(() => {
    setWidth(data.width);
  }, [data.width]);

  const onResizeStart = (e: DragEvent<HTMLDivElement>) => {
    initialDragX.current = e.clientX;
  };

  const onResize = (e: DragEvent<HTMLDivElement>) => {
    if (e.clientX === 0) return;

    const movedBy = e.clientX - initialDragX.current;
    initialDragX.current = e.clientX;
    setWidth((width) => {
      const newWidth = width + movedBy;
      if (newWidth < MIN_WIDTH) return MIN_WIDTH;

      return newWidth;
    });
  };

  const { mutateAsync } = useUpdateColumnMutation();
  const onResizeEnd = async () => {
    await mutateAsync({ columnId: data.id, data: { width } });
  };
  return (
    <li
      style={{ minWidth: width, width }}
      className="block w-full pb-4 border h-fit rounded-lg shadow bg-gray-800 border-t-0 border-gray-700 sticky top-0"
    >
      <div className="sticky top-0 bg-gray-800 p-4 border-t border-gray-700 rounded-t-lg">
        <h5 className="text-lg font-bold tracking-tight text-white sticky">
          {data.title}
        </h5>
        <div
          className="absolute -right-px top-[0.5rem] bottom-[0.5rem] cursor-move w-2 bg-gray-700 select-none opacity-0"
          draggable
          onDragStart={onResizeStart}
          onDrag={onResize}
          onDragEnd={onResizeEnd}
        />
      </div>
      <div className="flex gap-4 flex-col px-4">
        {/* {data.cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      <CreateCard columnId={column.id} /> */}
      </div>
    </li>
  );
};

export default Column;
