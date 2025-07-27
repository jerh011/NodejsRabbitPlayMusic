/*
  Warnings:

  - You are about to drop the column `fechaNacimiento` on the `artistas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artistas" DROP COLUMN "fechaNacimiento",
ADD COLUMN     "fechanacimiento" TIMESTAMP(3);
