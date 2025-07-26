-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);
