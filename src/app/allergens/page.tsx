import { Suspense } from "react";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { AllergenStatCards } from "@/components/views/allergens/allergen-stat-cards";
import { AllergenTable } from "@/components/views/allergens/allergen-table";
import { queryClient } from "@/lib/query-client";
import { db } from "../../../drizzle";
import { allergens_db } from "../../../drizzle/db/allergens.db";

export default async function Page() {
  const allergens = await db.select().from(allergens_db);
  await queryClient.prefetchQuery({
    queryKey: ["allergens"],
    queryFn: () => allergens,
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
        <AllergenStatCards allergensTotalCount={allergens.length} />
        <Suspense fallback={<div>Loading allergen table...</div>}>
          <AllergenTable />
        </Suspense>
      </AppLayout.Content>
    </AppLayout>
  );
}
