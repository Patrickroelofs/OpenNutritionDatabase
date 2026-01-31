import { eq } from "drizzle-orm";
import { db } from "../../../../../drizzle";
import { allergens } from "../../../../../drizzle/db/allergens";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
): Promise<Response> => {
  const { id } = await params;

  const allergen = await db
    .select()
    .from(allergens)
    .where(eq(allergens.id, id));

  const result = allergen[0] ?? null;

  if (!result) {
    return new Response("Allergen not found", { status: 404 });
  }

  return Response.json(result);
};
