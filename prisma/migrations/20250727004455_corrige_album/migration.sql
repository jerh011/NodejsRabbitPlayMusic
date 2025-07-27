/*
  Warnings:

  - You are about to drop the column `fechaLanzamiento` on the `albumes` table. All the data in the column will be lost.
  - Added the required column `fechalanzamiento` to the `albumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "albumes" DROP COLUMN "fechaLanzamiento",
ADD COLUMN     "fechalanzamiento" TIMESTAMP(3) NOT NULL;
