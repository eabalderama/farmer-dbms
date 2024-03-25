import CreateExpertiseForm from "@/components/Forms/CreateExpertiseForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CreateExpertise() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-primary hover:bg-accent text-black">
          Add Expertise
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Expertise</SheetTitle>
          <SheetDescription asChild>
            <CreateExpertiseForm />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
