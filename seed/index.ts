import { db } from "../drizzle";
import {
  allergens_db,
  allergensInsertSchema,
} from "../drizzle/db/allergens.db";

async function seedAllergens() {
  const allergens = [
    {
      name: "Peanuts",
      description: "A legume that is a common allergen.",
      status: "pending",
    },
    {
      name: "Tree nuts",
      description: "Includes almonds, walnuts, cashews, etc.",
      status: "pending",
    },
    {
      name: "Milk",
      description: "Dairy milk and products derived from it.",
      status: "pending",
    },
    {
      name: "Eggs",
      description: "Chicken eggs and products containing eggs.",
      status: "pending",
    },
    {
      name: "Fish",
      description: "All types of fish.",
      status: "pending",
    },
    {
      name: "Shellfish",
      description: "Includes shrimp, crab, lobster, etc.",
      status: "pending",
    },
    {
      name: "Wheat",
      description: "A cereal grain that is a common allergen.",
      status: "pending",
    },
    {
      name: "Soy",
      description: "Soybeans and products derived from soy.",
      status: "pending",
    },
    {
      name: "Sesame",
      description: "Sesame seeds and products containing sesame.",
      status: "pending",
    },
    {
      name: "Gluten",
      description: "A protein found in wheat, barley, and rye.",
      status: "pending",
    },
    {
      name: "Sulfites",
      description:
        "Preservatives found in dried fruits, wines, and some processed foods.",
      status: "pending",
    },
    {
      name: "Mustard",
      description: "A common ingredient in condiments and processed foods.",
      status: "pending",
    },
    {
      name: "Celery",
      description:
        "Includes celery stalks, leaves, seeds, and root (celeriac).",
      status: "pending",
    },
    {
      name: "Lupin",
      description:
        "Seeds and flour from the lupin plant, sometimes used in baked goods.",
      status: "pending",
    },
    {
      name: "Mollusks",
      description: "Includes clams, mussels, oysters, scallops, and snails.",
      status: "pending",
    },
    {
      name: "Corn",
      description: "Corn and products derived from corn.",
      status: "pending",
    },
    {
      name: "Buckwheat",
      description: "A grain-like seed sometimes used in gluten-free foods.",
      status: "pending",
    },
    {
      name: "Poppy seeds",
      description: "Seeds from the poppy plant, used in baked goods.",
      status: "pending",
    },
    {
      name: "Latex",
      description: "Natural rubber latex, found in some foods and products.",
      status: "pending",
    },
    {
      name: "Legumes (other than peanuts/soy)",
      description: "Includes lentils, peas, chickpeas, and beans.",
      status: "pending",
    },
    {
      name: "Nightshades",
      description: "Includes tomatoes, potatoes, peppers, and eggplant.",
      status: "pending",
    },
    {
      name: "Mustard greens",
      description: "Leafy greens from the mustard plant.",
      status: "pending",
    },
  ];

  const parsedAllergens = allergensInsertSchema.array().parse(allergens);

  await db.insert(allergens_db).values(parsedAllergens);

  console.log("Seeded allergens table.");
}

seedAllergens()
  .catch((err) => {
    console.error("Error seeding allergens:", err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
