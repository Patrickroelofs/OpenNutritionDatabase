import type { Allergen } from "../../drizzle/db/allergens.db";

interface GetAllAllergensParams {
  page?: number;
  pageSize?: number;
}

export const getAllAllergens = async ({
  page = 1,
  pageSize = 10,
}: GetAllAllergensParams = {}) => {
  const response = await fetch(
    `/api/allergens?page=${page}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch allergens");
  }

  const data = await response.json();

  return data as {
    page: number;
    pageSize: number;
    total: number;
    data: Allergen[];
  };
};
