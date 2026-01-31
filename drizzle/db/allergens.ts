import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestampColumns, verificationStatusEnum } from "./common";

export const allergens = pgTable("allergens", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  status: verificationStatusEnum("status").notNull().default("pending"),
  ...timestampColumns,
});
