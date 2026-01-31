"use client";

import { useQuery } from "@tanstack/react-query";
import type { VariantProps } from "class-variance-authority";
import { parseAsInteger, useQueryState } from "nuqs";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(10));

  const { data, isLoading } = useQuery({
    queryKey: ["allergens"],
    queryFn: () =>
      getAllAllergens({
        page,
        pageSize,
      }),
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
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Name</TableHead>
            <TableHead className="w-1/2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((allergen) => (
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage((prev) => prev - 1)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
