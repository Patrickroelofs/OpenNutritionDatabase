import Main from "@/components/app.main";
import DashboardHeader from "@/components/app-breadcrumbs";
import CreateNewForm from "@/forms/create-new-form";

export default function Page() {
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
