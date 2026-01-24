import type { NutritionalItem } from "@/components/table";
import { db } from "../../../../drizzle";
import { barcodesTable } from "../../../../drizzle/db/schema";

export const dynamic = "force-dynamic";

export const GET = async (): Promise<Response> => {
  const barcodes = await db.select().from(barcodesTable);

  const rows: NutritionalItem[] = barcodes.map((entry) => ({
    id: entry.id,
    barcode: entry.barcode,
  }));

  return Response.json(rows);
};

export const POST = async (request: Request): Promise<Response> => {
  const { barcode } = await request.json();

  const result = await db.insert(barcodesTable).values({ barcode }).returning();

  if (result.length === 0) {
    return new Response("Failed to add barcode", { status: 500 });
  }

  const newEntry = result[0];

  const newItem: NutritionalItem = {
    id: newEntry.id,
    barcode: newEntry.barcode,
  };

  return Response.json(newItem);
};
