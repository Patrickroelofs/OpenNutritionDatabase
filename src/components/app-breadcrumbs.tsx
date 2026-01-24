import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";

interface DashboardHeaderProps {
  items: Array<{ label: string; href: string }>;
}

function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">ONDB</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            {props.items.map((item, index) => (
              <BreadcrumbItem key={item.href}>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                {index < props.items?.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default DashboardHeader;
