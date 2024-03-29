import { Suspense } from "react";
import CreatePlantedCrop from "./CreateplantedCrops";
import PlantedCropTable from "./PlantedCropTable";

export default function PlantedCropsPage() {
  return (
    <main className="min-h-screen items-center p-24">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">Planted Crops</h1>
        <CreatePlantedCrop />
      </div>
      <div className="w-full mt-5">
        <Suspense fallback={<>Loading.....</>}>
          <PlantedCropTable />
        </Suspense>
      </div>
    </main>
  );
}
