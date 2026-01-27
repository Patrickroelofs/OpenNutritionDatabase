import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const barcodesTable = pgTable("barcodes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  barcode: varchar("barcode", { length: 13 }).notNull().unique(),
});

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  barcodeId: integer()
    .references(() => barcodesTable.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
});
