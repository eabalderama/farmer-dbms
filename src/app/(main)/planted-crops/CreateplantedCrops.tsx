import { getCrop } from "@/actions/crop";
import { getFarmers } from "@/actions/farmer";
import CreatePlantedCropForm from "@/components/Forms/CreatePlantedCropForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default async function CreatePlantedCrop() {
  const farmers = await getFarmers();
  const crops = await getCrop();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-primary hover:bg-accent text-black">
          Add Planted Crop
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Planted Crop</SheetTitle>
          <SheetDescription asChild>
            {/* <CreateCropForm /> */}
            <CreatePlantedCropForm crops={crops} farmers={farmers} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
