import type { AllergenWithRelations } from "@/components/views/allergens/allergen-table";

export const getAllAllergens = async () => {
  const response = await fetch("/api/allergens");

  if (!response.ok) {
    throw new Error("Failed to fetch allergens");
  }

  const data = await response.json();

  return data as AllergenWithRelations[];
};
