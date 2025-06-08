import React, { useEffect, useState } from "react";
import Combobox from "./Combobox";

export function DataTableToolbar({
  table,
  toolbar,
  onPageSizeChange,
  hiddenPageSize = false,
}) {
  const [val, setVal] = useState(table.getState().pagination.pageSize);

  useEffect(() => {
    if (onPageSizeChange) {
      onPageSizeChange(val);
    }
    table.setPageSize(val);
  }, [val]);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 items-center justify-between px-1.5">
      {toolbar && <div className="w-full md:w-auto">{toolbar}</div>}
      <div className="flex items-center space-x-2 w-full shrink-0 md:w-[110px]">
        {!hiddenPageSize && (
          <>
            <p className="text-soft">Show </p>
            <Combobox
              placeholder="Search"
              options={[5, 10, 20, 30, 40, 50, 100].map((pageSize) => ({
                label: String(pageSize),
                value: pageSize,
              }))}
              onValueChange={(value) => {
                setVal(Number(value));
              }}
              defaultValue={val}
              hideSearch
            />
          </>
        )}
      </div>
    </div>
  );
}
