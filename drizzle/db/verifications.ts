import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { entityTypeEnum, verificationStatusEnum } from "./common";
import { user } from "./auth";

export const verifications = pgTable("verifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  entityType: entityTypeEnum("entity_type").notNull(),
  entityId: uuid("entity_id").notNull(),
  status: verificationStatusEnum("status").notNull(),
  verifiedBy: text("verified_by").references(() => user.id, {
    onDelete: "set null",
  }),
  comment: text("comment"),
  verifiedAt: timestamp("verified_at"),
});