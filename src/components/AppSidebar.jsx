import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { NestedMenuItem } from "./NestedMenuItem";
import { useSelector } from "react-redux";

export function AppSidebar() {
  const { menu } = useSelector((state) => state.auth);
  // const moduleAccesses = menu?.moduleAccesses || [];

  // const allowedCodes = new Set(moduleAccesses.map((mod) => mod.moduleCode));

  // const hasAccess = (item) => {
  //   if (!item.moduleCode) return true;
  //   return allowedCodes.has(item.moduleCode);
  // };
  
  const pathname = usePathname();
  const [openIndexes, setOpenIndexes] = React.useState(
    {}
  );

  useEffect(() => {
    // Reset open indexes when user changes
    setOpenIndexes({});

    const initializeOpenIndexes = (items, parentId = 0) => {
      [...items ?? []].forEach((item) => {
        if (item.children?.length) {
          let matchPaths = 0;
          item?.moduleUrl?.split("/")?.forEach((pathName) => {
            if (pathname?.split("/").includes(pathName)) {
              matchPaths += 1;
            }
          });

          if (matchPaths === item?.moduleUrl?.split("/")?.length) {
            setOpenIndexes(() => ({
              [`${parentId}`]: `${item.id}`,
            }));
          } else {
            setOpenIndexes(() => ({
              [`${parentId}`]: "",
            }));
          }

          initializeOpenIndexes(item.children, item.id);
        }
      });
    };

    initializeOpenIndexes(menu.modules);
  }, [pathname, menu]);

  const handleOpenChange = (
    parentId,
    itemId,
    open
  ) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [`${parentId}`]: open ? `${itemId}` : "",
    }));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="p-4 pb-1">
          <div className="overflow-hidden">
            <Image
              className="inline-block max-w-[none] w-[107px] h-[48px]"
              src="/logo-kalbe.png"
              width={107}
              height={48}
              alt="Logo PT. Kalbe Farma Tbk"
            />
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {[...menu?.modules ?? []].sort(
          (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
        ).map((menu, menuIndex) => (
          <SidebarGroup key={menuIndex}>
            {menu?.moduleName && <SidebarGroupLabel>{menu.moduleName}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {[...menu?.children].sort(
                  (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
                ).map((item) => (
                  <NestedMenuItem
                    item={item}
                    parentId={0}
                    parents={item?.parents}
                    key={item?.moduleCode}
                    openIndexes={openIndexes}
                    onOpenChange={handleOpenChange}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
