import CreateUserForm from "@/components/Forms/CreateUserForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CreateUser() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-primary hover:bg-accent text-black">
          Add Worker
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Worker</SheetTitle>
          <SheetDescription asChild>
            <CreateUserForm />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
