import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestampColumns } from "./common";

export const allergens = pgTable("allergens", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  ...timestampColumns,
});