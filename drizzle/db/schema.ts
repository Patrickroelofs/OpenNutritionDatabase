import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const barcodesTable = pgTable("barcodes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  barcode: varchar("barcode", { length: 13 }).notNull().unique(),
});
