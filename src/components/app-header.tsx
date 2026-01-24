"use client";

import { DatabaseIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarGroup>
                <SidebarGroupLabel>Actions</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <Link href="/create">
                        <PlusIcon className="size-5!" />
                        <span>Create new</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Database</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <Link href="/">
                        <DatabaseIcon className="size-5!" />
                        <span>View all</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
