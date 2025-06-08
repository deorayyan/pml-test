import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

const LeftToolbar = ({
  onSearchChange,
  onMyDocumentChange,
  hiddenMyDocument = false,
  hiddenSearch = false
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = React.useState(
    searchParams.get("search") ?? ""
  );

  const [myDocument, setMyDocument] = React.useState();

  function handleSearch() {
    const params = new URLSearchParams();
    searchParams.forEach((val, key) => {
      params.set(key, val);
    });
    if (search) {
      params.set("search", search);
      params.set("page", 0);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleMyDocumentFilter(checked) {
    const params = new URLSearchParams();
    searchParams.forEach((val, key) => {
      params.set(key, val);
    });
    setMyDocument(checked)
    if (checked === "yes") {
      params.set("myDocument", checked);
      params.set("page", 0);
    } else {
      params.delete("myDocument");
      params.set("page", 0);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const myDocumentParam = searchParams.get("myDocument");
    if (myDocumentParam) {
      setMyDocument(myDocumentParam);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-3">
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        {!hiddenSearch &&
          <Input
            bounceTime={100}
            value={search}
            placeholder="Search"
            className="w-full md:w-auto min-w-[200px]"
            endAdornment={<Search size={14} />}
            handleEndAdornmentClick={(e) => {
              if (onSearchChange) {
                e.preventDefault();
                e.stopPropagation();
                onSearchChange(search)
              } else {
                handleSearch();
              }
            }}

            onKeyDown={(e) => {
              if (e.code === "Enter") {
                if (onSearchChange) {
                  e.stopPropagation();
                  e.preventDefault();
                  onSearchChange(search)
                } else {
                  handleSearch();
                }
              }
            }}

            onChange={(e) => setSearch(e.target.value)}
          />
        }

        {!hiddenMyDocument &&
          <div className="flex items-center group gap-1.5">
            <Checkbox
              className="group-hover:border-primary"
              id="myDocument"
              value={myDocument}
              checked={myDocument === "yes"}
              onCheckedChange={(checked) => {
                if (onMyDocumentChange) {
                  onMyDocumentChange(search)
                } else {
                  handleMyDocumentFilter(checked ? "yes" : "no");
                }
              }}
            />
            <Label htmlFor="myDocument" className="cursor-pointer">
              My Document
            </Label>
          </div>
        }

      </div>
    </div>
  );
};

export default LeftToolbar;
