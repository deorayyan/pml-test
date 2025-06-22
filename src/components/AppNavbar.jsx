import { useSelector } from "react-redux";
import { UserNav } from "./UserNav";
import { useSidebar } from "./ui/Sidebar";
import { Button } from "./ui/Button";
import { Menu } from "lucide-react";

export default function AppNavbar() {
  const { setOpenMobile } = useSidebar();
  const { authData, loading, loadingMenu } = useSelector((state) => state.auth);

  if (loading || loadingMenu || !authData) return <>Loading...</>;

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

          <div className="flex gap-3 items-center content-center ml-2">
            <div className="grid grid-cols-1 text-right">
              <p className="mb-0">{authData.user}</p>
              <p className="text-xs mb-0 text-muted-foreground">
                {authData.username}
              </p>
            </div>
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
