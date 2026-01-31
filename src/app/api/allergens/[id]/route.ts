import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { db } from "../../../../../drizzle";
import { allergens_db } from "../../../../../drizzle/db/allergens.db";

export const GET = async (
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> => {
  const { id } = params;

  const allergen = await db
    .select()
    .from(allergens_db)
    .where(eq(allergens_db.id, id));

  const result = allergen[0] ?? null;

  if (!result) {
    return new Response("Allergen not found", { status: 404 });
  }

  return Response.json(result);
};
