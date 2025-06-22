import { DataTable } from "@/components/DataTable";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Check, MoreHorizontal, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { useDialog } from "@/context/DialogContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteMasterTracker } from "@/redux/slices/masterTrackerSlice";
import { useToast } from "@/hooks/useToast";
import RowNumber from "@/components/RowNumber";

const MasterTrackerTable = ({
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
                <Link href={`/master/tracker/edit/${row.original.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                openDialog({
                  title: "Delete Item",
                  description:
                    "Are you sure you want to delete this item? This action cannot be undone.",
                  variant: "danger",
                  onConfirm: async () => {
                    await dispatch(deleteMasterTracker({
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
      accessorKey: "code",
      meta: { label: "Code", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => {
        return (
          <Button variant="link" asChild>
            <Link href={`/master/tracker/${row.original?.id}`}>
              {row.getValue("code")}
            </Link>
          </Button>
        );
      },
    },
    {
      accessorKey: "parentCode",
      meta: { label: "Parent Code", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Parent Code" />
      ),
    },
    {
      accessorKey: "description",
      meta: { label: "Description", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      accessorKey: "order",
      meta: { label: "Order", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order" />
      ),
    },
    {
      accessorKey: "actionType",
      meta: { label: "Action Type", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action Type" />
      ),
    },
    {
      accessorKey: "moduleFlow",
      meta: { label: "Module Flow", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Module Flow" />
      ),
    },
    {
      accessorKey: "mandays",
      meta: { label: "Mandays", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mandays" />
      ),
    },
    {
      accessorKey: "isParallel",
      meta: { label: "Parallel", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Parallel" />
      ),
      cell: ({ row }) => {
        return (
          <div className={`flex justify-center ${row.getValue("isParallel") ? "text-success" : "text-danger"}`}>
            { row.getValue("isParallel") ? <Check size={16} /> : <X size={16} /> }
          </div>
        );
      },
    },
    {
      accessorKey: "isPublic",
      meta: { label: "Public", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Public" />
      ),
      cell: ({ row }) => {
        return (
          <div className={`flex justify-center ${row.getValue("isPublic") ? "text-success" : "text-danger"}`}>
            { row.getValue("isPublic") ? <Check size={16} /> : <X size={16} /> }
          </div>
        );
      },
    },
    {
      accessorKey: "isUsingNotification",
      meta: { label: "Notification", nowrap: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Notification" />
      ),
      cell: ({ row }) => {
        return (
          <div className={`flex justify-center ${row.getValue("isUsingNotification") ? "text-success" : "text-danger"}`}>
            { row.getValue("isUsingNotification") ? <Check size={16} /> : <X size={16} /> }
          </div>
        );
      },
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
export default MasterTrackerTable;
