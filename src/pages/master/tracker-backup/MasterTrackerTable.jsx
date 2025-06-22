import { DataTable } from "@/components/DataTable";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Check, MoreVertical, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { useDialog } from "@/context/DialogContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteTracker } from "@/redux/slices/masterTrackerSlice";
import { useToast } from "@/hooks/useToast";

const MasterTrackerTable = ({
  data,
  loading,
}) => {
  const { openDialog } = useDialog();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { userData } = useSelector((state) => state.auth);
  const columns = [
    {
      id: "actions",
      accessorKey: "id",
      meta: { label: "Actions", sortable: false },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({row}) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
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
                  await dispatch(deleteTracker({
                    id: row?.original.id,
                    deletedBy: userData.user
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
      )
    },
    {
      id: "no",
      accessorKey: "no",
      meta: { label: "No" },
      cell: ({ row }) => row.index + 1,
      size: 40,
    },
    {
      accessorKey: "code",
      meta: { label: "Code" },
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
      meta: { label: "Parent Code" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Parent Code" />
      ),
    },
    {
      accessorKey: "description",
      meta: { label: "Description" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      accessorKey: "order",
      meta: { label: "Order" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order" />
      ),
    },
    {
      accessorKey: "actionType",
      meta: { label: "Action Type" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action Type" />
      ),
    },
    {
      accessorKey: "moduleFlow",
      meta: { label: "Module Flow" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Module Flow" />
      ),
    },
    {
      accessorKey: "mandays",
      meta: { label: "Mandays" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mandays" />
      ),
    },
    {
      accessorKey: "isParallel",
      meta: { label: "Parallel" },
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
      meta: { label: "Public" },
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
      meta: { label: "Notification" },
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
      data={data}
      columns={columns}
      loading={loading}
      primaryColumns={['Code']}
    />
  )
};
export default MasterTrackerTable;
