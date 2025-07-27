-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artistas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "genero" VARCHAR(50) NOT NULL,
    "fechaNacimiento" TIMESTAMP(3),
    "biografia" TEXT,
    "paisOrigen" VARCHAR(50),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artistas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albumes" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "fechaLanzamiento" TIMESTAMP(3) NOT NULL,
    "portada" VARCHAR(255),
    "artistaId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "albumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canciones" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "duracion" INTEGER NOT NULL,
    "numeroTrack" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "canciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "albumes" ADD CONSTRAINT "albumes_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "artistas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canciones" ADD CONSTRAINT "canciones_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
