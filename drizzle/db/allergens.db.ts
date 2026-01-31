import { pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { timestampColumns, verificationStatusEnum } from "./common.db";

export const allergens_db = pgTable("allergens", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: verificationStatusEnum("status").notNull().default("pending"),
  ...timestampColumns,
});

export const allergenSeverityEnum = pgEnum("allergen_severity", [
  "low",
  "medium",
  "high",
]);

const dateField = z.union([z.iso.datetime({ offset: true }), z.date()]);

export const allergensSchema = createSelectSchema(allergens_db).extend({
  createdAt: dateField,
  updatedAt: dateField,
});

export type Allergen = z.infer<typeof allergensSchema>;

export const allergensInsertSchema = createInsertSchema(allergens_db);
