import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus } from "lucide-react";
import Link from "next/link";
import MasterTrackerTable from "./MasterTrackerTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTrackers } from "@/redux/slices/masterTrackerSlice";
import { useRouter } from "next/router";

const pageTitle = "Master Tracker";

export default function MasterTrackerPage({ searchParams }) {
  const router = useRouter();
  const {
    page = 0,
    perPage = 5,
    sort = "DESC",
    sortBy = "order",
    search,
  } = router.query;
  const dispatch = useDispatch();
  // const [pagination, setPagination] = useState({
  //   page: router.query.page,
  //   perPage: router.query.perPage,
  //   sort: router.query.sort,
  //   sortBy: router.query.sortBy,
  //   search: router.query.search,
  // });
  const { data, loading } = useSelector((state) => state.tracker);

  useEffect(() => {
    dispatch(
      fetchTrackers({
        page,
        perPage,
        sort,
        sortBy,
        search,
      })
    );
  }, [dispatch, router]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <PageHeader
        pageTitle={pageTitle}
        tools={
          <Button asChild>
            <Link href="/master/tracker/add">
              <Plus /> Add New
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent>
          <div className="h-full flex-1 flex-col space-y-8 py-6 md:flex">
            <MasterTrackerTable
              data={data}
              loading={loading}
              // onSearchChange={(search) => {
              //   console.log("search", search);
              //   setPagination({
              //     ...pagination,
              //     search,
              //   });
              // }}
              // onPageSizeChange={(pageSize) => {
              //   console.log("page size", pageSize);
              //   setPagination({
              //     ...pagination,
              //     pageSize,
              //   });
              // }}
              // onSortChange={(sort) => {
              //   console.log("sort", sort);
              //   setPagination({
              //     ...pagination,
              //     sort: sort[0].desc ? "DESC" : "ASC",
              //     sortBy: sort[0].id,
              //   });
              // }}
              // onPageChange={(page) => {
              //   console.log("page", page);
              //   setPagination({
              //     ...pagination,
              //     page,
              //   });
              // }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
