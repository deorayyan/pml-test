import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { clearAuthData, logout } from "@/redux/slices/authSlice";
import { getInitials } from "@/utils/string";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export function UserNav() {
  const { authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-10 h-10 overflow-visible rounded-full"
        >
          <Avatar>
            <AvatarFallback>{getInitials(authData.user)}</AvatarFallback>
          </Avatar>
          <div className="bg-success shrink-0 rounded-full h-3 w-3 absolute border-2 border-white bottom-0 right-0"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{authData.user}</p>
            <p className="text-xs leading-none text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
              {authData.username}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await dispatch(logout(authData));
            dispatch(clearAuthData());
            router.replace("/auth/login");
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
