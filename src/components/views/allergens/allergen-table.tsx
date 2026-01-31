"use client";

import { useQuery } from "@tanstack/react-query";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { VariantProps } from "class-variance-authority";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMemo } from "react";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

const columns: ColumnDef<Allergen>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge variant={statusVariant(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
];

export const AllergenTable = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(10)
  );

  const { data } = useQuery({
    queryKey: ["allergens", page, pageSize],
    queryFn: () =>
      getAllAllergens({
        page,
        pageSize,
      }),
  });

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data?.data || defaultData,
    columns,
    pageCount: data?.totalPages,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;

      setPage(next.pageIndex + 1);
      setPageSize(next.pageSize);
    },
    manualPagination: true,
  });

  return (
    <>
      <Table className="w-full table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          {table.getCanPreviousPage() && (
            <PaginationItem>
              <PaginationPrevious
                aria-label="Previous page"
                onClick={() => table.previousPage()}
                type="button"
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>
          )}

          {Array.from({ length: table.getPageCount() }, (_, idx) => {
            const pageNum = idx + 1;
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={
                    pageNum === table.getState().pagination.pageIndex + 1
                  }
                  onClick={() => table.setPageIndex(idx)}
                  type="button"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {table.getCanNextPage() && (
            <PaginationItem>
              <PaginationNext onClick={() => table.nextPage()} type="button">
                Next
              </PaginationNext>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};
