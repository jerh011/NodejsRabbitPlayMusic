-- CreateTable
CREATE TABLE "favoritos" (
    "id" SERIAL NOT NULL,
    "cancionid" INTEGER NOT NULL,
    "creadoen" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_cancionid_fkey" FOREIGN KEY ("cancionid") REFERENCES "canciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;
