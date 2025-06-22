import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus } from "lucide-react";
import Link from "next/link";
import RequestTable from "./RequestTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRequests } from "@/redux/slices/requestSlice";
import { useRouter } from "next/router";
import { camelToSnake } from "@/utils/string";

const pageTitle = "Lab Analysis Request";

export default function RequestPage({ query }) {
  const router = useRouter();
  const [search, setSearch] = useState(query?.search || "");
  const [page, setPage] = useState(query?.page || "0");
  const [perPage, setPerPage] = useState(query?.perPage || "10");
  const [sortBy, setSortBy] = useState(query?.sortBy || "id");
  const [sort, setSort] = useState(query?.sort || "desc");

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.request);

  const handleSearchChange = (q) => {
    setSearch(q);
    setPage("0");
    updateQuery({ search: q, page: "0" });
  };

  const handleSortChange = (sort) => {
    const sortStr = sort[0].desc ? "desc" : "asc";
    const sortByStr = sort[0].id;
    setSort(sortStr);
    setSortBy(sortByStr);
    setPage("0");
    updateQuery({ sort: sortStr, sortBy: sortByStr, page: "0" });
  };

  const handlePerPageChange = (perPage) => {
    setPerPage(perPage);
    setPage("0");
    updateQuery({ perPage, page: "0" });
  };

  const handlePageChange = (page) => {
    setPage(page);
    updateQuery({ page: page });
  };

  const updateQuery = (params) => {
    router.replace({
      pathname: router.pathname,
      query: {
        page,
        perPage,
        search,
        sort,
        sortBy,
        ...params,
      },
    });
  };

  useEffect(() => {
    if (!router.isReady || loading) return;
    console.log("fetch", {
      search,
      page,
      perPage,
      sort,
      sortBy: camelToSnake(sortBy),
    });
    dispatch(
      fetchRequests({
        search,
        page,
        perPage,
        sort,
        sortBy: camelToSnake(sortBy),
      })
    );
  }, [dispatch, router, search, page, perPage, sort, sortBy]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <PageHeader
        pageTitle={pageTitle}
        tools={
          <Button asChild>
            <Link href="/request/ca/add">
              <Plus /> Add New
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent>
          <div className="h-full flex-1 flex-col space-y-8 py-6 md:flex">
            <RequestTable
              page={page}
              perPage={perPage}
              search={search}
              sort={sort}
              sortBy={sortBy}
              data={data}
              loading={loading}
              onSearchChange={(search) => {
                handleSearchChange(search);
              }}
              onSortChange={(sort) => {
                handleSortChange(sort);
              }}
              onPageChange={(page) => {
                console.log("page changed", page);
                handlePageChange(page);
              }}
              onPerPageChange={(perPage) => {
                handlePerPageChange(perPage);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;

  return {
    props: {
      query,
    },
  };
};
