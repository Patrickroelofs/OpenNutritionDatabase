import type { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface AppLayoutProps {
  children?: ReactNode;
}

interface AppLayoutContentProps {
  children: ReactNode;
}

interface AppLayoutFooterProps {
  children: ReactNode;
}

interface AppLayoutHeaderProps {
  breadcrumbs?: {
    href: string;
    label: string;
  }[];
  actions?: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return <div>{children}</div>;
}

function Header({ breadcrumbs, actions }: AppLayoutHeaderProps) {
  return (
    <header className="flex shrink-0 items-center border-b">
      <div className="flex w-full items-center">
        <div className="px-2">
          <SidebarTrigger />
        </div>
        <Separator orientation="vertical" />
        <div className="p-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">ONDB</BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
              {breadcrumbs?.map((breadcrumb, index) => (
                <BreadcrumbItem key={breadcrumb.href}>
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {actions && (
          <div className="mr-2 ml-auto flex items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  );
}

function Content({ children }: AppLayoutContentProps) {
  return <main className="p-4">{children}</main>;
}

function Footer({ children }: AppLayoutFooterProps) {
  return <footer className="mt-8">{children}</footer>;
}

AppLayout.Header = Header;
AppLayout.Content = Content;
AppLayout.Footer = Footer;

export default AppLayout;
