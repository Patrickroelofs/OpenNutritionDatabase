"use client";

import { useQuery } from "@tanstack/react-query";
import type { VariantProps } from "class-variance-authority";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  const { data, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Name</TableHead>
            <TableHead className="w-1/2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...new Array(10)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: index is fine here since it's a static skeleton loader
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-40" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">Name</TableHead>
          <TableHead className="w-1/2">Status</TableHead>
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
