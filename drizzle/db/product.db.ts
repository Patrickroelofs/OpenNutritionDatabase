import { pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { allergens_db } from "./allergens.db";
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

// Product Allergens (Many-to-Many relationship)
export const productAllergens = pgTable(
  "product_allergens",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
      }),
    allergenId: uuid("allergen_id")
      .notNull()
      .references(() => allergens_db.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [primaryKey({ columns: [table.productId, table.allergenId] })]
);
