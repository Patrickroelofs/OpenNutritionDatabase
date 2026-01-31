import { pgEnum, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.db";

export const entityTypeEnum = pgEnum("entity_type", ["product", "allergen"]);

export const verificationStatusEnum = pgEnum("verification_status", [
  "pending",
  "verified",
  "rejected",
]);

export const timestampColumns = {
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
};

export const createdByColumn = {
  createdBy: text("created_by").references(() => user.id, {
    onDelete: "set null",
  }),
};
