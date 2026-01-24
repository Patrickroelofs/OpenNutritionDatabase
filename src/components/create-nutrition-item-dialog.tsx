/** biome-ignore-all lint/correctness/noChildrenProp: Allowed in forms */
"use client";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "@tanstack/react-form-nextjs";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import z from "zod";
import { useIsMobile } from "@/hooks/use-mobile";
import { queryClient } from "@/providers/queryClientProvider";
import { BarcodeScanner } from "./barcode-scanner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";

const formSchema = z.object({
  barcode: z
    .string()
    .min(13, "Barcode must be at least 13 characters.")
    .max(13, "Barcode must be at most 13 characters."),
});

function CreateNutritionItemDialog() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

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
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["nutrition-items"] });
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });

  if (!isMobile) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger
          render={
            <Button
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              onClick={() => setOpen(true)}
            >
              <PlusIcon />
              <span>Add a new item</span>
            </Button>
          }
        />
        <DialogContent>
          <DialogHeader>Add a new item to the database</DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-x-auto overflow-y-auto px-4 pb-4">
              <FieldGroup>
                <form.Field
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Barcode</FieldLabel>
                        <BarcodeScanner
                          aria-invalid={isInvalid}
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(value) => field.handleChange(value)}
                          value={field.state.value}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                  name="barcode"
                />
              </FieldGroup>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button
          className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
          onClick={() => setOpen(true)}
        >
          <PlusIcon />
          <span>Add a new item</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a new item to the database</DrawerTitle>
        </DrawerHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Barcode</FieldLabel>
                    <BarcodeScanner
                      aria-invalid={isInvalid}
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(value) => field.handleChange(value)}
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="barcode"
            />
          </FieldGroup>
          <DrawerFooter className="mt-4">
            <Button type="submit">Submit</Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateNutritionItemDialog;
