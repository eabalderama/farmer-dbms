import CreateCropForm from "@/components/Forms/CreateCropForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CreateCrops() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-primary hover:bg-accent text-black">
          Add Crop
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Crop</SheetTitle>
          <SheetDescription asChild>
            <CreateCropForm />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
