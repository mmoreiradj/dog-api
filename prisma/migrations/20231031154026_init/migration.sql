-- CreateTable
CREATE TABLE "dogs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "dogs_pkey" PRIMARY KEY ("id")
);
