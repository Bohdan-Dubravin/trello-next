/*
  Warnings:

  - You are about to drop the column `columns_id` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `column_id` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_columns_id_fkey";

-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "columns_id",
ADD COLUMN     "column_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
