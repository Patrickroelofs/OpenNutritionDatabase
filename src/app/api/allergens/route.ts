import { count } from "drizzle-orm";
import { db } from "../../../../drizzle";
import {
  allergens_db,
  allergensInsertSchema,
} from "../../../../drizzle/db/allergens.db";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");

  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const page = pageParam ? Number(pageParam) : DEFAULT_PAGE;
  const pageSize = pageSizeParam ? Number(pageSizeParam) : DEFAULT_PAGE_SIZE;

  const isInvalidPage = Number.isNaN(page) || page < 1;
  const isInvalidPageSize = Number.isNaN(pageSize) || pageSize < 1;

  if (isInvalidPage || isInvalidPageSize) {
    return new Response("Invalid pagination parameters", { status: 400 });
  }
  const offset = (page - 1) * pageSize;

  const data = await db
    .select()
    .from(allergens_db)
    .limit(pageSize)
    .offset(offset);

  const totalCount = await db
    .select({
      count: count(),
    })
    .from(allergens_db)
    .then((result) => result[0].count);

  return Response.json({
    page,
    pageSize,
    total: Number(totalCount),
    data,
  });
};

export const POST = async (request: Request) => {
  const data = await request.json();

  const parsedData = allergensInsertSchema.safeParse(data);

  if (!parsedData.success) {
    return new Response("Invalid allergen data", { status: 400 });
  }

  const [newAllergen] = await db
    .insert(allergens_db)
    .values({
      name: parsedData.data.name,
    })
    .returning();

  return Response.json(newAllergen, { status: 201 });
};
