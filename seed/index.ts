import { and, eq, isNull } from "drizzle-orm";
import type { drizzle } from "drizzle-orm/node-postgres";
import { db } from "../drizzle";
import { allergens_db } from "../drizzle/schema";

interface AllergenSeed {
  name: string;
  description?: string;
  children?: readonly AllergenSeed[];
}

const seedData: readonly AllergenSeed[] = [
  {
    name: "Milk",
    description:
      "Dairy milk proteins (casein, whey). Common in cheese, yogurt, butter, and many processed foods.",
  },
  {
    name: "Eggs",
    description:
      "Egg proteins, commonly found in baked goods, sauces, and some pasta.",
  },
  {
    name: "Fish",
    description:
      "Finfish such as salmon, tuna, cod, and others. Often present in sauces and cross-contaminated oils.",
    children: [
      { name: "Salmon" },
      { name: "Tuna" },
      { name: "Cod" },
      { name: "Halibut" },
      { name: "Trout" },
      { name: "Mackerel" },
      { name: "Sardine" },
    ],
  },
  {
    name: "Shellfish",
    description:
      "Crustaceans and mollusks. Common in seafood dishes and some sauces.",
    children: [
      {
        name: "Crustaceans",
        children: [{ name: "Shrimp" }, { name: "Crab" }, { name: "Lobster" }],
      },
      {
        name: "Mollusks",
        children: [
          { name: "Clam" },
          { name: "Oyster" },
          { name: "Scallop" },
          { name: "Mussel" },
          { name: "Squid" },
        ],
      },
    ],
  },
  {
    name: "Tree nuts",
    description:
      "Nuts grown on trees. Common in baked goods, nut butters, oils, and desserts.",
    children: [
      { name: "Almond" },
      { name: "Brazil nut" },
      { name: "Cashew" },
      { name: "Hazelnut" },
      { name: "Macadamia nut" },
      { name: "Pecan" },
      { name: "Pine nut" },
      { name: "Pistachio" },
      { name: "Walnut" },
    ],
  },
  {
    name: "Peanuts",
    description:
      "Legume commonly used in snacks and cooking; high cross-contact risk with tree nuts.",
  },
  {
    name: "Wheat",
    description:
      "Contains gluten; common in breads, pasta, baked goods, and many processed foods.",
  },
  {
    name: "Soy",
    description:
      "Soybeans and derivatives (tofu, soy sauce, soy lecithin). Common in processed foods.",
  },
  {
    name: "Sesame",
    description:
      "Seeds and oil; commonly found in breads, dressings, tahini, and Middle Eastern cuisine.",
  },
  { name: "Celery" },
  { name: "Mustard" },
  { name: "Lupin" },
  { name: "Sulphur dioxide and sulphites" },
];

const findAllergenId = async (
  db: ReturnType<typeof drizzle>,
  name: string,
  parentId: string | null
): Promise<string | null> => {
  const rows = await db
    .select({ id: allergens_db.id })
    .from(allergens_db)
    .where(
      and(
        eq(allergens_db.name, name),
        parentId === null
          ? isNull(allergens_db.parentId)
          : eq(allergens_db.parentId, parentId)
      )
    )
    .limit(1);

  return rows[0]?.id ?? null;
};

const upsertAllergen = async (
  db: ReturnType<typeof drizzle>,
  name: string,
  description: string | undefined,
  parentId: string | null
): Promise<string> => {
  const existingId = await findAllergenId(db, name, parentId);
  if (existingId) {
    return existingId;
  }

  const inserted = await db
    .insert(allergens_db)
    .values({
      name,
      description: description ?? null,
      parentId,
    })
    .returning({ id: allergens_db.id });

  const id = inserted[0]?.id;
  if (!id) {
    throw new Error(`Failed to insert allergen: ${name}`);
  }
  return id;
};

const insertBranch = async (
  db: ReturnType<typeof drizzle>,
  node: AllergenSeed,
  parentId: string | null
): Promise<void> => {
  const id = await upsertAllergen(db, node.name, node.description, parentId);
  const children = node.children ?? [];
  for (const child of children) {
    // eslint-disable-next-line no-await-in-loop
    await insertBranch(db, child, id);
  }
};

const main = async (): Promise<void> => {
  try {
    for (const root of seedData) {
      // eslint-disable-next-line no-await-in-loop
      await insertBranch(db, root, null);
    }
  } catch (error: unknown) {
    // Prefer throwing descriptive Error objects
    const message =
      error instanceof Error ? error.message : "Unknown error during seeding.";
    throw new Error(message);
  }
};

main();
