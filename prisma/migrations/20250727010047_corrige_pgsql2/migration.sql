-- AlterTable
ALTER TABLE "albumes" ALTER COLUMN "actualizadoen" SET DATA TYPE DATE,
ALTER COLUMN "creadoen" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "artistas" ALTER COLUMN "fechanacimiento" SET DATA TYPE DATE,
ALTER COLUMN "actualizadoen" SET DATA TYPE DATE,
ALTER COLUMN "creadoen" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "canciones" ALTER COLUMN "creadoen" SET DATA TYPE DATE;
