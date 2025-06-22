import { DataTable } from "@/components/DataTable";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { useDialog } from "@/context/DialogContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest } from "@/redux/slices/requestSlice";
import { useToast } from "@/hooks/useToast";
import { formatNumber } from "@/utils/utils";
import RowNumber from "@/components/RowNumber";

const RequestTable = ({
  data,
  loading,
  onSearchChange,
  onPerPageChange,
  onPageChange,
  onSortChange,
  page,
  perPage,
  search,
  sort,
  sortBy
}) => {
  const { openDialog } = useDialog();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { authData } = useSelector((state) => state.auth);

  const columns = [
    {
      id: "no",
      header: "No.",
      enableHiding: false,
      cell: ({ row, table }) => <RowNumber table={table} index={row.index} />,
      size: 40,
    },
    {
      id: "actions",
      accessorKey: "id",
      meta: { label: "Actions", sortable: false, nowrap: true },
      header: "Actions",
      cell: ({row}) => (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <MoreHorizontal />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link href={`/request/ca/edit/${row.original.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                openDialog({
                  title: "Delete Item",
                  description:
                    "Are you sure you want to delete this item? This action cannot be undone.",
                  variant: "danger",
                  onConfirm: async () => {
                    await dispatch(deleteRequest({
                      id: row?.original.id,
                      deletedBy: authData.user
                    }));
                    toast({
                      title: "Deleted",
                      description: "Item has been deleted.",
                    });
                  },
                });
              }}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
    {
      accessorKey: "projectCode",
      meta: { label: "Project Code", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Project Code" />
      ),
      cell: ({ row }) => {
        return (
          <Button variant="link" asChild>
            <Link href={`/request/ca/${row.original?.id}`}>
              {row.getValue("projectCode")}
            </Link>
          </Button>
        );
      },
    },
    {
      accessorKey: "partnerId",
      meta: { label: "Partner ID", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Partner ID" />
      ),
    },
    {
      accessorKey: "receivingStatus",
      meta: { label: "Receiving Status", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Receiving Status" />
      ),
    },
    {
      accessorKey: "lastStatus",
      meta: { label: "Last Status", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Status" />
      ),
    },
    {
      accessorKey: "leadTime",
      meta: { label: "Lead Time", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Lead Time" />
      ),
      cell: ({ row }) => formatNumber(row.original?.leadTime),
    },
    {
      accessorKey: "totalFee",
      meta: { label: "Total Fee", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Fee" />
      ),
      cell: ({ row }) => formatNumber(row.original?.totalFee),
    },
    {
      accessorKey: "requestDate",
      meta: { label: "Request Date", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Request Date" />
      ),
      cell: ({ row }) => format(new Date(row.original?.requestDate ?? ""), "dd MMM yyyy HH:mm"),
    },
    {
      accessorKey: "receivedDate",
      meta: { label: "Received Date", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Received Date" />
      ),
      cell: ({ row }) => format(new Date(row.original?.receivedDate ?? ""), "dd MMM yyyy HH:mm"),
    },
    {
      accessorKey: "dueDate",
      meta: { label: "Due Date", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due Date" />
      ),
      cell: ({ row }) => format(new Date(row.original?.dueDate ?? ""), "dd MMM yyyy HH:mm"),
    },
    {
      accessorKey: "analysisWipDate",
      meta: { label: "Analysis WIP Date", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Analysis WIP Date" />
      ),
      cell: ({ row }) => format(new Date(row.original?.analysisWipDate ?? ""), "dd MMM yyyy HH:mm"),
    },
    {
      accessorKey: "analysisCompletedDate",
      meta: { label: "Analysis CompletedDate", nowrap: true },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Analysis CompletedDate" />
      ),
      cell: ({ row }) => format(new Date(row.original?.analysisCompletedDate ?? ""), "dd MMM yyyy HH:mm"),
    },
  ];

  return (
    <DataTable
      search={search}
      page={page}
      perPage={perPage}
      sort={sort}
      sortBy={sortBy}
      data={data}
      columns={columns}
      loading={loading}
      primaryColumns={['UserName']}
      onSearchChange={(search) => {
        if (onSearchChange) {
          onSearchChange(search);
        }
      }}
      onPageChange={(page) => {
        if (onPageChange) {
          onPageChange(page);
        }
      }}
      onSortChange={(sort) => {
        if (onSortChange) {
          onSortChange(sort);
        }
      }}
      onPerPageChange={(perPage) => {
        if (onPerPageChange) {
          onPerPageChange(perPage);
        }
      }}
    />
  )
};
export default RequestTable;
