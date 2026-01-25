/** biome-ignore-all lint/correctness/noChildrenProp: Allowed as part of form element */
"use client";

import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "@tanstack/react-form-nextjs";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";
import z from "zod";
import { BarcodeScanner } from "@/components/barcode-scanner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/providers/queryClientProvider";

const formSchema = z.object({
  barcode: z
    .string()
    .min(13, "Barcode must be at least 13 characters.")
    .max(13, "Barcode must be at most 13 characters."),
});

function CreateNewForm() {
  const [showScanner, setShowScanner] = React.useState(false);

  const form = useForm({
    defaultValues: {
      barcode: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await addBarcodeMutation.mutateAsync(value.barcode);
    },
  });

  const addBarcodeMutation = useMutation({
    mutationFn: async (barcode: string) => {
      const response = await fetch("/api/barcodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ barcode }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add barcode (HTTP ${response.status})`);
      }

      return response.json();
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["nutrition-items"] });
      redirect("/");
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Nutrition Item</CardTitle>
        <CardDescription>
          Use the form below to add a new nutrition item by scanning or entering
          its barcode.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <CardContent>
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Barcode</FieldLabel>
                    <FieldDescription>
                      Scan or enter the 13-digit EAN barcode of the nutrition
                      item.
                    </FieldDescription>
                    <div className="flex max-w-md flex-col gap-4 md:flex-row">
                      <Input
                        aria-invalid={isInvalid}
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter barcode"
                        value={field.state.value}
                      />
                      <BarcodeScanner
                        aria-invalid={isInvalid}
                        id={field.name}
                        onError={(err) => {
                          console.error("Barcode scan error:", err);
                        }}
                        onScan={(value) => {
                          field.handleChange(value);
                          setShowScanner(false);
                        }}
                        setShowScanner={setShowScanner}
                        showScanner={showScanner}
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="barcode"
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-6">
          <Button type="submit">
            <CheckIcon />
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CreateNewForm;
