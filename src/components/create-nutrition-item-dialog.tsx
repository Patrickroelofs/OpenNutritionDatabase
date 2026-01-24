"use client";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "@tanstack/react-form-nextjs";
import z from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { SidebarMenuButton } from "./ui/sidebar";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  barcode: z.string().min(5, "Barcode must be at least 5 characters."),
});

function CreateNutritionItemDialog() {
  const form = useForm({
    defaultValues: {
      title: "",
      barcode: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted with value:", value);
    },
  });

  return (
    <Dialog>
      <DialogTrigger
        render={
          <SidebarMenuButton
            className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            tooltip="Add a new item"
          >
            <PlusIcon />
            <span>Add a new item</span>
          </SidebarMenuButton>
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
          <FieldGroup>
            <form.Field
              // biome-ignore lint/correctness/noChildrenProp: Allowed in forms
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Product Title</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Organic Apple Juice"
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
          </FieldGroup>
          <DialogFooter className="mt-4">
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNutritionItemDialog;
