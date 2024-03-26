import { getWorkers } from "@/actions/user";
import CreateExpertiseForm from "@/components/Forms/CreateExpertiseForm";
import CreateFarmerForm from "@/components/Forms/CreateFarmerForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default async function CreateFarmer() {
  const users = await getWorkers();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-primary hover:bg-accent text-black">
          Add Farmer
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Farmer</SheetTitle>
          <SheetDescription asChild>
            <CreateFarmerForm users={users} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
