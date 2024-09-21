-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'CLIENT');

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "Name" TEXT,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" "Role" NOT NULL DEFAULT 'CLIENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ShoppingCart" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "ShoppingCart_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Order" (
    "Id" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "PuchasedAt" TIMESTAMP(3),
    "DeliveredAt" TIMESTAMP(3),
    "CartId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Product" (
    "Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Company" TEXT NOT NULL,
    "orderId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCart_UserId_key" ON "ShoppingCart"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_Title_key" ON "Product"("Title");

-- AddForeignKey
ALTER TABLE "ShoppingCart" ADD CONSTRAINT "ShoppingCart_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_CartId_fkey" FOREIGN KEY ("CartId") REFERENCES "ShoppingCart"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
