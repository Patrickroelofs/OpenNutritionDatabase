import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
// biome-ignore lint/performance/noNamespaceImport: Allowed for schema import
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL || "", {
  schema,
});
