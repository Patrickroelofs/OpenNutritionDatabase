/** biome-ignore-all lint/correctness/noChildrenProp: Allowed in forms */
"use client";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "@tanstack/react-form-nextjs";
import z from "zod";
import { BarcodeScanner } from "./barcode-scanner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";

const formSchema = z.object({
  barcode: z
    .string()
    .min(13, "Barcode must be at least 13 characters.")
    .max(13, "Barcode must be at most 13 characters."),
});

function CreateNutritionItemDialog() {
  const form = useForm({
    defaultValues: {
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
          <Button className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground">
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

export default CreateNutritionItemDialog;
