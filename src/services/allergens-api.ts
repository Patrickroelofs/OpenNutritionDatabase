import { allergensSchema } from "../../drizzle/db/allergens.db";

export const getAllAllergens = async () => {
  const response = await fetch("/api/allergens");

  if (!response.ok) {
    throw new Error("Failed to fetch allergens");
  }

  const data = await response.json();
  const parsedData = allergensSchema.array().safeParse(data);

  if (!parsedData.success) {
    throw new Error("Invalid allergen data format");
  }

  return parsedData.data;
};
