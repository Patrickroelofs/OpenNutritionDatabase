"use client";

import { DatabaseIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "./ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  function handleLinkPress() {
    if (isMobile) {
      toggleSidebar();
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Database</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <Link href="/" onClick={handleLinkPress}>
                  <DatabaseIcon className="size-5!" />
                  <span>View all</span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
