import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { allergens } from "./allergens";
import { createdByColumn, timestampColumns } from "./common";

// Products
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  barcode: varchar("barcode", { length: 100 }),
  servingSize: varchar("serving_size", { length: 100 }),
  ...timestampColumns,
  ...createdByColumn,
});

// Product Allergens (Many-to-Many relationship)
export const productAllergens = pgTable("product_allergens", {
  productId: uuid("product_id").notNull().references(() => products.id, {
    onDelete: "cascade",
  }),
  allergenId: uuid("allergen_id").notNull().references(() => allergens.id, {
    onDelete: "cascade",
  }),
}, (table) => ({
  pk: [table.productId, table.allergenId],
}));