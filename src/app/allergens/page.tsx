import { Suspense } from "react";
import AppLayout from "@/components/app-layout";
import { AllergenTable } from "@/components/views/allergens/allergen-table";
import { queryClient } from "@/lib/query-client";
import { getAllAllergens } from "@/services/allergens-api";

export default async function Page() {
  await queryClient.prefetchQuery({
    queryKey: ["allergens"],
    queryFn: () => getAllAllergens({ page: 1, pageSize: 15 }),
  });

  return (
    <AppLayout>
      <AppLayout.Header
        breadcrumbs={[
          {
            href: "/allergens",
            label: "Allergens",
          },
        ]}
      />
      <AppLayout.Content>
        <Suspense fallback={<div>Loading allergen table...</div>}>
          <AllergenTable />
        </Suspense>
      </AppLayout.Content>
    </AppLayout>
  );
}
