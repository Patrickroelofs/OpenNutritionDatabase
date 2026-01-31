import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdByColumn, timestampColumns } from "./common.db";

// Products
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  barcode: varchar("barcode", { length: 20 }).notNull(),
  servingSize: varchar("serving_size", { length: 30 }),
  ...timestampColumns,
  ...createdByColumn,
});
