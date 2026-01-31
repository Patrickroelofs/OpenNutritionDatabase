"use client";

import { useQuery } from "@tanstack/react-query";
import type { VariantProps } from "class-variance-authority";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAllergens } from "@/services/allergens-api";
import type { Allergen } from "../../../../drizzle/db/allergens.db";

export const AllergenTable = () => {
  const { data } = useQuery({
    queryKey: ["allergens"],
    queryFn: getAllAllergens,
  });

  const statusVariant = (
    status: Allergen["status"]
  ): VariantProps<typeof badgeVariants>["variant"] => {
    switch (status) {
      case "verified":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((allergen) => (
          <TableRow key={allergen.id}>
            <TableCell>{allergen.name}</TableCell>
            <TableCell>
              <Badge variant={statusVariant(allergen.status)}>
                {allergen.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
