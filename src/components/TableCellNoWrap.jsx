"use client";

import React from "react";
import { TableCell } from "./ui/Table";
import DataTableCellWrapper from "./DataTableCellWrapper";

const TableCellNoWrap = React.forwardRef(
  ({ className, children, maxWidth = 300, ...props }, ref) => {
    return (
      <TableCell
        {...props}
        className="whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          maxWidth,
        }}
      >
        <DataTableCellWrapper maxWidth={maxWidth}>
          {children}
        </DataTableCellWrapper>
      </TableCell>
    );
  }
);

export default TableCellNoWrap;
