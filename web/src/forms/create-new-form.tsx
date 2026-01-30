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
import { Textarea } from "@/components/ui/textarea";
import { queryClient } from "@/providers/queryClientProvider";

const formSchema = z.object({
  barcode: z
    .string()
    .min(13, "Barcode must be at least 13 characters.")
    .max(13, "Barcode must be at most 13 characters."),
  title: z.string().min(1, "Title is required."),
  description: z.string(),
});

function CreateNewForm() {
  const [showScanner, setShowScanner] = React.useState(false);

  const form = useForm({
    defaultValues: {
      barcode: "",
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await createNutritionItemMutation.mutateAsync({
        barcode: value.barcode,
        title: value.title,
        description: value.description,
      });
    },
  });

  const createNutritionItemMutation = useMutation({
    mutationFn: async ({
      barcode,
      title,
      description,
    }: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/nutrition-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          barcode,
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add nutrition item (HTTP ${response.status})`
        );
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
        name="create-nutrition-item-form"
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
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <FieldDescription>
                      Enter the title of the nutrition item.
                    </FieldDescription>
                    <Input
                      aria-invalid={isInvalid}
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter title"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="title"
            />

            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <FieldDescription>
                      Optionally, enter a description for the nutrition item.
                    </FieldDescription>
                    <Textarea
                      aria-invalid={isInvalid}
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter description"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="description"
            />

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
                    <div className="flex flex-col gap-4 md:flex-row">
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
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <Button disabled={!canSubmit || isSubmitting} type="submit">
                <CheckIcon />
                Submit
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CreateNewForm;
