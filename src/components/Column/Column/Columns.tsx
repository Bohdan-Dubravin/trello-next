import { Columns } from "@prisma/client";

interface ColumnsProps {
  column: Columns;
}

const Column = ({ column }: ColumnsProps) => {
  return (
    <li
      style={{ minWidth: column.width, width: column.width }}
      className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {column.title}
        </h5>
      </div>
    </li>
  );
};

export default Column;
