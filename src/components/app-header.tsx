"use client";

import {
  DatabaseIcon,
  GithubLogoIcon,
  PlusIcon,
  UserPlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { signIn, useSession } from "@/lib/auth-client";
import { NavUser } from "./app-user";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "./ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();
  const session = useSession();

  function handleLinkPress() {
    if (isMobile) {
      toggleSidebar();
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {!session.data && (
        <SidebarHeader className="group-data-[collapsible=icon]:hidden">
          <Card className="gap-2 py-4 shadow-none">
            <CardHeader className="px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <UserPlusIcon size="16" />
                Sign in to your account
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <Button
                className="w-full"
                onClick={() =>
                  signIn.social({
                    provider: "github",
                    callbackURL: "/",
                    errorCallbackURL: "/error",
                  })
                }
                variant="default"
              >
                <GithubLogoIcon />
                Sign in with Github
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground text-xs">
                Sign in to be able to create and manage your own entries.
              </p>
            </CardFooter>
          </Card>
        </SidebarHeader>
      )}
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
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
