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
import { trimPath } from "@/utils/menu";

export const NestedMenuItem = React.memo(
  ({
    item,
    activeItem,
    onOpenChange,
    openIndexes
  }) => {
    const pathname = usePathname();

    const isActive = trimPath(pathname) === item.moduleUrl;

    const handleOpenChange = (open) => {
      onOpenChange(item?.parentModuleCode, item?.moduleCode, open);
    };

    const isOpened = openIndexes[`${item?.parentModuleCode}`] === `${item.moduleCode}` || item.moduleCode === activeItem?.parentModuleCode;
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
                  className={`ml-auto transition-transform ${isOpened && "rotate-180"}`}
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="CollapsibleContent">
              <SidebarMenuSub>
                {item.children.map((sub) => (
                  <NestedMenuItem
                    key={sub.moduleCode}
                    item={sub}
                    activeItem={activeItem}
                    onOpenChange={onOpenChange}
                    openIndexes={openIndexes}
                  />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return !item.children.length ? (
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
