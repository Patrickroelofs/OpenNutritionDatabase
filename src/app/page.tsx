import DashboardHeader from "@/components/app-breadcrumbs";
import Main from "@/components/app-main";

export default function Page() {
  return (
    <>
      <DashboardHeader items={[{ label: "View all", href: "/" }]} />
      <Main />
    </>
  );
}
