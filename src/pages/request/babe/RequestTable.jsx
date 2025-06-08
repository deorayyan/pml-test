import { DataTable } from "@/components/DataTable";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import LeftToolbar from "@/components/DataTableToolbarLeft";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { useDialog } from "@/context/DialogContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest } from "@/redux/slices/requestSlice";
import { useToast } from "@/hooks/useToast";

const RequestTable = ({
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
              <Link href={`/request/babe/edit/${row.original.id}`}>Edit</Link>
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
      accessorKey: "partnerId",
      meta: { label: "Partner ID" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Partner ID" />
      ),
    },
    {
      accessorKey: "companyName",
      meta: { label: "Company Name" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company Name" />
      ),
    },
    {
      accessorKey: "projectCode",
      meta: { label: "Project Code" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Project Code" />
      ),
    },
    {
      accessorKey: "requestDate",
      meta: { label: "Request Date" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Request Date" />
      ),
      cell: ({ row }) => format(new Date(row.original?.requestDate ?? ""), "dd MMM yyyy HH:mm"),
    },
    {
      accessorKey: "lastStatus",
      meta: { label: "Last Status" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Status" />
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      toolbar={
        <LeftToolbar
          hiddenMyDocument
        />
      }
      loading={loading}
      primaryColumns={['UserName']}
    />
  )
};
export default RequestTable;
