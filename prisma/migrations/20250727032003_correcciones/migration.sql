-- CreateTable
CREATE TABLE "Tareas" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("id")
);
