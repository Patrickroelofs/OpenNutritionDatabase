"use client";

import { useQuery } from "@tanstack/react-query";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAllergens } from "@/services/allergens-api";
import type { allergens_dbType } from "../../../../drizzle/schema";

export type AllergenWithRelations = allergens_dbType & {
  children: AllergenWithRelations[];
};

const columns: ColumnDef<AllergenWithRelations>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row, getValue }) => {
      const isExpandable = (row.original.children?.length ?? 0) > 0;
      const label = String(getValue() ?? "");
      return (
        <div className="flex items-center">
          {isExpandable ? (
            <button
              aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
              className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-ring"
              onClick={row.getToggleExpandedHandler()}
              type="button"
            >
              {row.getIsExpanded() ? "▾" : "▸"}
            </button>
          ) : (
            <span aria-hidden="true" className="mr-2 inline-block h-5 w-5" />
          )}
          <span style={{ marginLeft: row.depth * 12 }}>{label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export const AllergenTable = () => {
  const { data } = useQuery({
    queryKey: ["allergens"],
    queryFn: () => getAllAllergens(),
  });

  const defaultData = useMemo<AllergenWithRelations[]>(() => [], []);

  const table = useReactTable({
    data: data || defaultData,
    columns,
    getSubRows: (row) => row.children || [],
    getRowCanExpand: (row) => (row.original.children?.length ?? 0) > 0,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Table>
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
  );
};
