import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/Sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import React from "react";
import Icon from "@/components/Icon";

const trimPath = (pathname) => {
  const segments = pathname?.split("/").filter(Boolean); // Split and remove empty parts

  if (
    segments?.length > 0 &&
    (segments[segments.length - 1] === "add" ||
      segments[segments.length - 1] === "detail")
  ) {
    segments?.pop(); // Remove the last segment if it's "add"
  }

  return "/" + segments?.join("/"); // Reconstruct the path
};

export const NestedMenuItem = React.memo(
  ({
    item,
    parents,
    parentId,
    openIndexes,
    onOpenChange,
  }) => {
    const pathname = usePathname();

    const isActive = trimPath(pathname) === item.moduleUrl;
    const matchPaths = item?.moduleUrl
      ?.split("/")
      .reduce(
        (count, pathName) =>
          pathname?.split("/").includes(pathName) ? count + 1 : count,
        0
      );
    const isParentOfCurrentPath = matchPaths === item.moduleUrl.split("/").length;

    const handleOpenChange = (open) => {
      onOpenChange(parentId, item?.moduleCode ?? 0, open);
    };

    const isOpened =
      openIndexes[`${parentId}`] === `${item.moduleCode}` || isParentOfCurrentPath;

    if (item.children?.length) {
      return (
        <Collapsible
          open={isOpened}
          onOpenChange={handleOpenChange}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.moduleName} isActive={isActive}>
                {item.icon && typeof item.icon === "string" && (
                  <Icon name={item.icon} />
                )}
                {item.icon && typeof item.icon !== "string" && <item.icon />}
                <span>{item.moduleName}</span>
                <ChevronDown
                  className={`ml-auto transition-transform ${isOpened && "rotate-180"
                    }`}
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="CollapsibleContent">
              <SidebarMenuSub>
                {item.children.map((sub) => (
                  <NestedMenuItem
                    item={sub}
                    parentId={item.moduleCode || 0}
                    key={sub.moduleCode}
                    openIndexes={openIndexes}
                    onOpenChange={onOpenChange}
                  />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return parentId === 0 ? (
      <SidebarMenuItem key={item.moduleName}>
        <SidebarMenuButton asChild tooltip={item.moduleName} isActive={isActive}>
          <Link href={item.moduleUrl}>
            {item.icon && typeof item.icon === "string" && (
              <Icon name={item.icon} />
            )}
            {item.icon && typeof item.icon !== "string" && <item.icon />}
            <div className="grid grid-cols-1">
              <span>{item.moduleName}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ) : (
      <SidebarMenuSubItem key={item.moduleName}>
        <SidebarMenuSubButton asChild tooltip={item.moduleName} isActive={isActive}>
          <Link href={item.moduleUrl}>
            {item.icon && typeof item.icon === "string" && (
              <Icon name={item.icon} />
            )}
            {item.icon && typeof item.icon !== "string" && <item.icon />}
            <span>{item.moduleName}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }
);

NestedMenuItem.displayName = "NestedMenuItem";
