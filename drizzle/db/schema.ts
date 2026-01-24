import { integer, pgTable, serial } from "drizzle-orm/pg-core";

export const barcodesTable = pgTable("barcodes", {
  id: serial("id").primaryKey(),
  barcode: integer("barcode").notNull().unique(),
});
