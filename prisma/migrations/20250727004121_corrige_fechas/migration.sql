/*
  Warnings:

  - You are about to drop the column `actualizadoEn` on the `albumes` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `albumes` table. All the data in the column will be lost.
  - You are about to drop the column `actualizadoEn` on the `canciones` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `canciones` table. All the data in the column will be lost.
  - Added the required column `actualizadoen` to the `albumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actualizadoen` to the `canciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "albumes" DROP COLUMN "actualizadoEn",
DROP COLUMN "creadoEn",
ADD COLUMN     "actualizadoen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "creadoen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "canciones" DROP COLUMN "actualizadoEn",
DROP COLUMN "creadoEn",
ADD COLUMN     "actualizadoen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "creadoen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
