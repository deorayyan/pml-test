import { useUser } from "@/app/context/UserContext";
import { UserNav } from "./user-nav";
import { Skeleton } from "./ui/skeleton";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Menu, TerminalSquare } from "lucide-react";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link";

export default function Header() {
  const { userData, role, loadingMenu, acl, userEntities } = useUser();
  const { setOpenMobile } = useSidebar();
  return (
    <div className="w-full shadow-panel py-3 px-3 lg:px-5 rounded-[6px] sticky bg-card top-0 z-20 h-[62px] flex items-center justify-between">
      <div>
        <Button
          type="button"
          className="lg:hidden"
          size="icon-rounded"
          onClick={() => {
            setOpenMobile(true);
          }}
        >
          <Menu />
        </Button>
      </div>
      <div className="grid grid-cols-1">
        <div className="flex gap-4">
          {acl.can("READ", "SYSTEM_LOG") && (
            <>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="link"
                    size="lg"
                    className="text-foreground hover:text-primary"
                  >
                    <Link href="/logs">
                      <TerminalSquare />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>System Log</TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="my-2 h-auto" />
            </>
          )}

          <div className="flex gap-3 items-center content-center ml-2">
            {userData && !loadingMenu ? (
              <>
                <div className="grid grid-cols-1 text-right">
                  <p className="mb-0">{userData?.name}</p>
                  <p className="text-xs mb-0 text-muted-foreground">
                    {role?.Name}{" "}
                    {role?.Code === "PIC_PLM"
                      ? `(${userEntities.map((entity) => entity).join(", ")})`
                      : null}
                  </p>
                </div>
                <UserNav />
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 text-right justify-end">
                  <Skeleton className="h-4 mb-1 w-[120px]" />
                  <Skeleton className="h-3 w-[120px]" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
