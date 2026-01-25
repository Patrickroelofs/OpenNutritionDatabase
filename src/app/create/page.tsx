import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/app-breadcrumbs";
import Main from "@/components/app-main";
import CreateNewForm from "@/forms/create-new-form";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

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
