import { eq } from "drizzle-orm";
import type { NutritionalItem } from "@/components/table";
import { db } from "../../../../drizzle";
import { barcodesTable, productsTable } from "../../../../drizzle/db/schema";

export const GET = async (): Promise<Response> => {
  const rows = await db
    .select({
      id: barcodesTable.id,
      barcode: barcodesTable.barcode,
      title: productsTable.title,
      description: productsTable.description,
    })
    .from(barcodesTable)
    .leftJoin(productsTable, eq(productsTable.barcodeId, barcodesTable.id));

  const response: NutritionalItem[] = rows.map((entry) => ({
    id: entry.id,
    barcode: entry.barcode,
    title: entry.title || "",
    description: entry.description || "",
  }));

  return Response.json(response);
};

export const POST = async (request: Request): Promise<Response> => {
  const { barcode, title, description } = await request.json();

  const [result] = await db
    .insert(barcodesTable)
    .values({ barcode })
    .returning();

  await db.insert(productsTable).values({
    barcodeId: result.id,
    title,
    description,
  });

  if (!result) {
    return new Response("Failed to add barcode", { status: 500 });
  }

  return Response.json({
    success: true,
    message: "Barcode added successfully",
  });
};
