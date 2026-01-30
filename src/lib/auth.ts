import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../drizzle";
// biome-ignore lint/performance/noNamespaceImport: required as auth-schema may have many exports
import * as schema from "../../drizzle/db/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
