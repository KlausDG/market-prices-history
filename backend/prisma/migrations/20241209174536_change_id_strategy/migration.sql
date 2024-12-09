/*
  Warnings:

  - The primary key for the `Market` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MeasurementUnit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PriceHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Purchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PurchasedProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `total_items` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_market_id_fkey";

-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_measurement_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_market_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedProduct" DROP CONSTRAINT "PurchasedProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedProduct" DROP CONSTRAINT "PurchasedProduct_purchase_id_fkey";

-- AlterTable
ALTER TABLE "Market" DROP CONSTRAINT "Market_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Market_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Market_id_seq";

-- AlterTable
ALTER TABLE "MeasurementUnit" DROP CONSTRAINT "MeasurementUnit_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MeasurementUnit_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MeasurementUnit_id_seq";

-- AlterTable
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ALTER COLUMN "market_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PriceHistory_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "measurement_unit_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_pkey",
ADD COLUMN     "total_items" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "market_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Purchase_id_seq";

-- AlterTable
ALTER TABLE "PurchasedProduct" DROP CONSTRAINT "PurchasedProduct_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "purchase_id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PurchasedProduct_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PurchasedProduct_id_seq";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_measurement_unit_id_fkey" FOREIGN KEY ("measurement_unit_id") REFERENCES "MeasurementUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedProduct" ADD CONSTRAINT "PurchasedProduct_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedProduct" ADD CONSTRAINT "PurchasedProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
