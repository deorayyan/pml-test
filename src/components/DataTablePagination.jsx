import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination";


const GetPageNumbers = ({
  currentPage = 1,
  pageCount = 0,
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 2,
}) => {
  const pagination = [];

  // Return empty array if pageCount is 0 or negative
  if (pageCount <= 0) return pagination;

  // If pageCount is small enough, just show all pages
  if (pageCount <= pageRangeDisplayed + marginPagesDisplayed * 2) {
    for (let i = 1; i <= pageCount; i++) {
      pagination.push(i);
    }
    return pagination;
  }

  // Add first margin pages
  for (let i = 1; i <= marginPagesDisplayed; i++) {
    pagination.push(i);
  }

  // Calculate the range of central pages
  let leftSide = Math.floor(pageRangeDisplayed / 2);
  let rightSide = pageRangeDisplayed - leftSide;

  // Calculate the start and end of the central range
  let startRange = Math.max(currentPage - leftSide, marginPagesDisplayed + 1);
  let endRange = Math.min(
    currentPage + rightSide - 1,
    pageCount - marginPagesDisplayed
  );

  // Adjust if out of bounds
  if (startRange <= marginPagesDisplayed) {
    endRange = Math.min(
      pageRangeDisplayed + marginPagesDisplayed,
      pageCount - marginPagesDisplayed
    );
    startRange = marginPagesDisplayed + 1;
  }

  if (endRange > pageCount - marginPagesDisplayed) {
    startRange = Math.max(
      pageCount - pageRangeDisplayed - marginPagesDisplayed + 1,
      marginPagesDisplayed + 1
    );
    endRange = pageCount - marginPagesDisplayed;
  }

  // Add first break if needed
  if (startRange > marginPagesDisplayed + 1) {
    pagination.push("...");
  }

  // Add central range
  for (let i = startRange; i <= endRange; i++) {
    pagination.push(i);
  }

  // Add second break if needed
  if (endRange < pageCount - marginPagesDisplayed) {
    pagination.push("...");
  }

  // Add last margin pages
  for (let i = pageCount - marginPagesDisplayed + 1; i <= pageCount; i++) {
    pagination.push(i);
  }

  return pagination;
};

export function DataTablePagination({
  table,
  onPageChange,
}) {
  const startIndex =
    table.getRowCount() > 0
      ? table.getState().pagination.pageSize *
          table.getState().pagination.pageIndex +
        1
      : 0;
  const endIndex =
    table.getState().pagination.pageIndex + 1 < table.getPageCount()
      ? table.getState().pagination.pageSize *
        (table.getState().pagination.pageIndex + 1)
      : table.getRowCount() || 0;
  const breakLabel = "...";
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-4 justify-center md:justify-between px-4">
      <div className="flex-1 text-muted-foreground w-full md:w-auto text-center md:text-left">
        Showing {startIndex} to {endIndex} of {table.getRowCount()} entries
      </div>
      {table.getPageCount() > 1 && (
        <div className="flex w-full md:w-auto items-center space-x-6 lg:space-x-8 justify-center md:justify-end">
          <div className="flex items-center space-x-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (onPageChange) {
                        onPageChange(`${table.getState().pagination.pageIndex - 1}`);
                      }
                      table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                  />
                </PaginationItem>
              </PaginationContent>

              <PaginationContent className="items-center">
                {GetPageNumbers({
                  currentPage: table.getState().pagination.pageIndex,
                  pageCount: table.getPageCount(),
                }).map((page, index) => (
                  <PaginationItem key={index}>
                    {typeof page !== "number" ? (
                      <span className="px-2 block">{breakLabel}</span>
                    ) : (
                      <PaginationLink
                        isActive={
                          page - 1 === table.getState().pagination.pageIndex
                        }
                        onClick={() => {
                          if (onPageChange) {
                            onPageChange(`${page - 1}`);
                          }
                          table.setPageIndex(page - 1);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
              </PaginationContent>

              <PaginationContent>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (onPageChange) {
                        onPageChange(`${table.getState().pagination.pageIndex + 1}`);
                      }
                      table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
