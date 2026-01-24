import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { SidebarMenuButton } from "./ui/sidebar";

function CreateNutritionItemDialog() {
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
        <DialogHeader>Hello World</DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNutritionItemDialog;
