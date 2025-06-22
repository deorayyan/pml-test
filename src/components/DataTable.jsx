import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { DataTablePagination } from "@/components/DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";
import { Minus, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";
import TableCellNoWrap from "./TableCellNoWrap";

export function DataTable({
  columns,
  data,
  hideToolbar,
  noData,
  primaryColumns = [],
  onSearchChange,
  onPerPageChange,
  onPageChange,
  onSortChange,
  loading,
  busy,
  search,
  page,
  perPage,
  sort,
  sortBy
}) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const stableData = (data?.items ? data?.items : data);

  // mobile detection
  const isMobile = useIsMobile();

  React.useEffect(() => {
    // Update column visibility for mobile
    if (isMobile && primaryColumns.length > 0) {
      const mobileVisibleColumns = {};
      columns?.forEach((col) => {
        mobileVisibleColumns[`${col.accessorKey}`] =
          primaryColumns.includes(col.accessorKey ?? "") ||
          col.accessorKey === "select";
      });
      setColumnVisibility(mobileVisibleColumns);
    } else {
      const desktopVisibleColumns = {};
      columns.forEach((col) => {
        desktopVisibleColumns[`${col.accessorKey || col.id}`] =
          col.id !== "expand" && !col.enableHiding;
      });
      setColumnVisibility(desktopVisibleColumns);
    }
  }, [isMobile, columns]);

  const dataWithPagination = data;
  const table = useReactTable({
    data: stableData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: Number(page),
        pageSize: Number(perPage),
      },
    },
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false,
    renderFallbackValue: false,
    manualSorting: true,
    manualPagination: true,
    rowCount: dataWithPagination?.totalItems,
  });

  React.useEffect(() => {
    if (sorting.length > 0) {
      if (onSortChange) {
        onSortChange(sorting);
      }
    }
  }, [sorting]);

  return (
    <div
      className={`rounded-lg border border-border relative grid grid-cols-1 gap-4 w-full pb-4 ${!hideToolbar ? "pt-4" : ""}`}
    >
      {busy && (
        <div className="absolute inset-0 bg-white/50 z-[1] flex items-center">
          <div className="flex w-full items-center justify-center h-[120px] gap-2">
            <div className="loader w-10"></div>
          </div>
        </div>
      )}
      {!hideToolbar && (
        <div className="px-2 md:px-4">
          <DataTableToolbar
            perPageDefaultValue={perPage}
            searchDefaultValue={search}
            onPerPageChange={(value) => {
              if (onPerPageChange && value !== perPage) {
                onPerPageChange(value);
              }
            }}
            onSearchChange={(value) => {
              if (onSearchChange) {
                onSearchChange(value);
              }
            }}
          />
        </div>
      )}
      <div
        className={`overflow-hidden border-border border-b ${
          !hideToolbar ? "border-t" : ""
        }`}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {isMobile && primaryColumns.length > 0 && (
                  <TableHead className="w-[20px] p-0"></TableHead>
                )}
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="font-semibold text-foreground"
                    >
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex w-full items-center justify-center h-[160px] gap-2">
                    <div className="loader w-10"></div>
                    <p className="py-10 ml-12 text-xl text-muted-foreground">
                      Fetching data...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows.map((row) => (
                <React.Fragment key={row.id}>
                  {/* Main Row */}
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {isMobile && primaryColumns.length > 0 && (
                      <TableCell width={20} className="p-2">
                        <button
                          type="button"
                          className="w-6 h-6 flex shrink-0 grow-0 items-center justify-center border border-border rounded"
                          onClick={() => row.toggleExpanded()}
                        >
                          {row.getIsExpanded() ? (
                            <Minus size={14} />
                          ) : (
                            <Plus size={14} />
                          )}
                        </button>
                      </TableCell>
                    )}
                    {row.getVisibleCells().map((cell) => (
                      <React.Fragment key={cell.id}>
                        {cell.column.columnDef.meta?.nowrap ? (
                          <TableCellNoWrap>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCellNoWrap>
                        ) : (
                          <TableCell>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        )}
                      </React.Fragment>
                    ))}
                  </TableRow>

                  {/* Expanded Row */}
                  {row.getIsExpanded() && isMobile && (
                    <React.Fragment>
                      {/* Dynamically render additional data */}
                      <TableRow>
                        <TableCell
                          colSpan={Object.keys(row.original || {}).length}
                          className="p-0"
                        >
                          <div className="max-w-[calc(100vw_-_68px)] overflow-auto">
                            <Table>
                              <TableBody>
                                {row.getAllCells().map((cell) => {
                                  return (
                                    cell.column.id !== "no" &&
                                    cell.column.id !== "select" &&
                                    cell.column.id !== "actions" &&
                                    !primaryColumns.includes(
                                      cell.column.id
                                    ) && (
                                      <TableRow key={cell.column.id}>
                                        <TableHead className="whitespace-nowrap">
                                          {(cell.column.columnDef.meta)?.label ?? cell.column.id}
                                        </TableHead>
                                        <TableCell>
                                          {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <>
                    {noData ?? (
                      <div className="h-48 text-center grid grid-cols-1 items-center content-center gap-1">
                        <p className="text-2xl font-semibold">
                          No Result Found
                        </p>
                        <p className="text-base">
                          Try adjusting your search or filter to find what
                          you're looking for.
                        </p>
                      </div>
                    )}
                  </>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        onPageChange={(page) => {
          if (onPageChange) {
            onPageChange(page);
          }
        }}
      />
    </div>
  );
}
