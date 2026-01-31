"use client";

import { SmileyNervousIcon } from "@phosphor-icons/react/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AllergenStatCards = ({
  allergensTotalCount,
}: {
  allergensTotalCount: number;
}) => {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-col justify-between space-y-0 pb-2">
          <CardTitle className="flex w-full items-center justify-between font-medium text-sm">
            <span>Total Allergens</span>
            <SmileyNervousIcon size="24" />
          </CardTitle>
          <CardDescription className="text-xs">
            Total number of allergens in the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">{allergensTotalCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};
