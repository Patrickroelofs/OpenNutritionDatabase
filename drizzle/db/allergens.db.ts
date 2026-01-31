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

export const userAllergenSeverity_db = pgTable("user_allergen_severity", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  allergenId: uuid("allergen_id").notNull(),
  severity: allergenSeverityEnum("severity").notNull(),
  ...timestampColumns,
});

const dateField = z.union([z.iso.datetime({ offset: true }), z.date()]);

export const allergensSchema = createSelectSchema(allergens_db).extend({
  createdAt: dateField,
  updatedAt: dateField,
});

export type Allergen = z.infer<typeof allergensSchema>;

export const allergensInsertSchema = createInsertSchema(allergens_db);

export const userAllergenSeveritySchema = createSelectSchema(
  userAllergenSeverity_db
);
export const userAllergenSeverityInsertSchema = createInsertSchema(
  userAllergenSeverity_db
);
