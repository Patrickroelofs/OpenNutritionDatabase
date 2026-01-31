import { db } from "../../../../drizzle";
import {
  allergens,
  allergensInsertSchema,
} from "../../../../drizzle/db/allergens.db";

export const GET = async () => {
  const allAllergens = await db.select().from(allergens);

  return Response.json(allAllergens);
};

export const POST = async (request: Request) => {
  const data = await request.json();

  const parsedData = allergensInsertSchema.safeParse(data);

  if (!parsedData.success) {
    return new Response("Invalid allergen data", { status: 400 });
  }

  const [newAllergen] = await db
    .insert(allergens)
    .values({
      name: parsedData.data.name,
    })
    .returning();

  return Response.json(newAllergen, { status: 201 });
};
