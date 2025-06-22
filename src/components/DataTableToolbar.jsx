import React, { useEffect, useState } from "react";
import Combobox from "./Combobox";
import { Input } from "./ui/Input";
import { Search } from "lucide-react";

export function DataTableToolbar({
  onPerPageChange,
  onSearchChange,
  hiddenPageSize = false,
  perPageDefaultValue = "10",
  searchDefaultValue = ""
}) {
  const [search, setSearch] = useState(searchDefaultValue);
  const [perPage, setPerPage] = useState(perPageDefaultValue);

  useEffect(() => {
    if (onPerPageChange) {
      onPerPageChange(perPage);
    }
  }, [perPage]);

  useEffect(() => {
    setPerPage(perPageDefaultValue);
  }, [perPageDefaultValue]);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 items-center justify-between px-1.5">
      <div className="w-full md:w-auto">
        <div className="flex flex-wrap md:flex-nowrap gap-3">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Input
              value={search}
              placeholder="Search"
              className="w-full md:w-auto min-w-[200px]"
              endAdornment={<Search size={14} />}
              handleEndAdornmentClick={(e) => {
                if (onSearchChange) {
                  e.preventDefault();
                  e.stopPropagation();
                  onSearchChange(search)
                }
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  if (onSearchChange) {
                    e.stopPropagation();
                    e.preventDefault();
                    onSearchChange(search)
                  }
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 w-full shrink-0 md:w-[110px]">
        {!hiddenPageSize && (
          <>
            <p className="text-soft">Show </p>
            <Combobox
              placeholder="Search"
              options={['1', '5', '10', '20', '30', '40', '50', '100'].map((pageSize) => ({
                label: pageSize,
                value: pageSize,
              }))}
              onValueChange={(value) => {
                setPerPage(value);
              }}
              defaultValue={perPage}
              hideSearch
            />
          </>
        )}
      </div>
    </div>
  );
}
