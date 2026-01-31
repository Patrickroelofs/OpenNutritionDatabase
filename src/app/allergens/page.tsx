import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { AllergenStatCards } from "@/components/views/allergens/allergen-stat-cards";
import { AllergenTable } from "@/components/views/allergens/allergen-table";
import { queryClient } from "@/lib/query-client";
import { getAllAllergens } from "@/services/allergens-api";

export default async function Page() {
  await queryClient.prefetchQuery({
    queryKey: ["allergens"],
    queryFn: getAllAllergens,
  });

  return (
    <AppLayout>
      <AppLayout.Header
        actions={<Button disabled>Add new Allergen</Button>}
        breadcrumbs={[
          {
            href: "/allergens",
            label: "Allergens",
          },
        ]}
      />
      <AppLayout.Content>
        <AllergenStatCards />
        <AllergenTable />
      </AppLayout.Content>
    </AppLayout>
  );
}
