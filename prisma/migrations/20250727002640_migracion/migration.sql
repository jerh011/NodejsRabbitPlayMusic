/*
  Warnings:

  - You are about to drop the column `actualizadoEn` on the `artistas` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `artistas` table. All the data in the column will be lost.
  - You are about to drop the column `paisOrigen` on the `artistas` table. All the data in the column will be lost.
  - Added the required column `actualizadoen` to the `artistas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "artistas" DROP COLUMN "actualizadoEn",
DROP COLUMN "creadoEn",
DROP COLUMN "paisOrigen",
ADD COLUMN     "actualizadoen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "creadoen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paisorigen" VARCHAR(50);
