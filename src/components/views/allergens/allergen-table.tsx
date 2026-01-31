"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAllergens } from "@/services/allergens-api";

export const AllergenTable = () => {
  const { data } = useQuery({
    queryKey: ["allergens"],
    queryFn: getAllAllergens,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((allergen) => (
          <TableRow key={allergen.id}>
            <TableCell>{allergen.name}</TableCell>
            <TableCell>{allergen.description}</TableCell>
            <TableCell>{allergen.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
