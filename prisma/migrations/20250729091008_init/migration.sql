-- CreateTable
CREATE TABLE "Tareas" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artistas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "paisorigen" VARCHAR(50),
    "genero" VARCHAR(50) NOT NULL,
    "fechanacimiento" DATE,
    "biografia" TEXT,
    "imagen" VARCHAR(255),
    "actualizadoen" DATE NOT NULL,
    "creadoen" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artistas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albumes" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "fechalanzamiento" DATE,
    "portada" VARCHAR(255),
    "descripcion" TEXT,
    "sello" VARCHAR(100),
    "productor" VARCHAR(100) NOT NULL,
    "artistaid" INTEGER NOT NULL,
    "creadoen" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoen" DATE NOT NULL,

    CONSTRAINT "albumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canciones" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "albumid" INTEGER NOT NULL,
    "duracion" INTEGER NOT NULL,
    "numerotrack" INTEGER NOT NULL,
    "letra" TEXT,
    "compositor" VARCHAR(100),
    "creadoen" DATE,
    "actualizadoen" DATE NOT NULL,

    CONSTRAINT "canciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favoritos" (
    "id" SERIAL NOT NULL,
    "cancionid" INTEGER NOT NULL,
    "creadoen" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "albumes" ADD CONSTRAINT "albumes_artistaid_fkey" FOREIGN KEY ("artistaid") REFERENCES "artistas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canciones" ADD CONSTRAINT "canciones_albumid_fkey" FOREIGN KEY ("albumid") REFERENCES "albumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_cancionid_fkey" FOREIGN KEY ("cancionid") REFERENCES "canciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;
