import { isNull } from "drizzle-orm";
import { db } from "../../../../drizzle";
import { allergens_db } from "../../../../drizzle/schema";

export const GET = async () => {
  const allergenGroups = await db.query.allergens_db.findMany({
    where: isNull(allergens_db.parentId),
    with: {
      children: true,
    },
  });

  return Response.json(allergenGroups);
};
