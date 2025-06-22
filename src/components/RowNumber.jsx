const RowNumber = ({ table, index }) => {
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  return (
    <div className="text-right">
      {pageSize * pageIndex + index + 1}
    </div>
  );
}

export default RowNumber;

