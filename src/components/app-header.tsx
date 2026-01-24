"use client";

import { DatabaseIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
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
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={
                  <Link href="/create" onClick={handleLinkPress}>
                    <PlusIcon className="size-5!" />
                    <span>Create new</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

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
