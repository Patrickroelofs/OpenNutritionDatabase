import DashboardHeader from "@/components/app-breadcrumbs";
import Main from "@/components/app-main";
import CreateNewForm from "@/forms/create-new-form";

export default async function Page() {
  return (
    <>
      <DashboardHeader
        items={[{ label: "Create new nutrition item", href: "/create" }]}
      />
      <Main>
        <CreateNewForm />
      </Main>
    </>
  );
}
