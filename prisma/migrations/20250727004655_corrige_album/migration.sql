/*
  Warnings:

  - You are about to drop the column `artistaId` on the `albumes` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `canciones` table. All the data in the column will be lost.
  - You are about to drop the column `numeroTrack` on the `canciones` table. All the data in the column will be lost.
  - You are about to drop the `Tarea` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artistaid` to the `albumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumid` to the `canciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numerotrack` to the `canciones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "albumes" DROP CONSTRAINT "albumes_artistaId_fkey";

-- DropForeignKey
ALTER TABLE "canciones" DROP CONSTRAINT "canciones_albumId_fkey";

-- AlterTable
ALTER TABLE "albumes" DROP COLUMN "artistaId",
ADD COLUMN     "artistaid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "canciones" DROP COLUMN "albumId",
DROP COLUMN "numeroTrack",
ADD COLUMN     "albumid" INTEGER NOT NULL,
ADD COLUMN     "numerotrack" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tarea";

-- CreateTable
CREATE TABLE "tarea" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "tarea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "albumes" ADD CONSTRAINT "albumes_artistaid_fkey" FOREIGN KEY ("artistaid") REFERENCES "artistas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canciones" ADD CONSTRAINT "canciones_albumid_fkey" FOREIGN KEY ("albumid") REFERENCES "albumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
