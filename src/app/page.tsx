import AppLayout from "@/components/app-layout";

export default function Page() {
  return (
    <AppLayout>
      <AppLayout.Header
        breadcrumbs={[
          {
            href: "/",
            label: "Home",
          },
        ]}
      />
    </AppLayout>
  );
}
