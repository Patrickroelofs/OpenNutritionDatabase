import DashboardHeader from "@/components/app-breadcrumbs";
import Main from "@/components/app-main";
import { TableComponent } from "@/components/table";

export default function Page() {
  return (
    <>
      <DashboardHeader items={[{ label: "View all", href: "/" }]} />
      <Main>
        <TableComponent />
      </Main>
    </>
  );
}
