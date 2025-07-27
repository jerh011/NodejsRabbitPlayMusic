/*
  Warnings:

  - Added the required column `productor` to the `albumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "albumes" ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "productor" VARCHAR(100) NOT NULL,
ADD COLUMN     "sello" VARCHAR(100);

-- AlterTable
ALTER TABLE "artistas" ADD COLUMN     "imagen" VARCHAR(255);

-- AlterTable
ALTER TABLE "canciones" ADD COLUMN     "compositor" VARCHAR(100),
ADD COLUMN     "letra" TEXT,
ALTER COLUMN "creadoen" DROP NOT NULL,
ALTER COLUMN "creadoen" DROP DEFAULT;
