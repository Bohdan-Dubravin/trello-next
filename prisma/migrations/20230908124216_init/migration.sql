-- CreateTable
CREATE TABLE "Boards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Columns" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "board_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Columns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "columns_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_columns_id_fkey" FOREIGN KEY ("columns_id") REFERENCES "Columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
