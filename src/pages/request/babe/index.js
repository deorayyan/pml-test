import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus } from "lucide-react";
import Link from "next/link";
import RequestTable from "./RequestTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRequests } from "@/redux/slices/requestSlice";
import { useRouter } from "next/router";

const pageTitle = "Request BA/BE";

export default function RequestPage({ searchParams }) {
  const router = useRouter();
  const {
    page = 0,
    perPage = 5,
    sort = "DESC",
    sortBy = "id",
    search,
  } = router.query;
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(
      fetchRequests({
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
            <Link href="/request/babe/add">
              <Plus /> Add New
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent>
          <div className="h-full flex-1 flex-col space-y-8 py-6 md:flex">
            <RequestTable data={data} loading={loading} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
