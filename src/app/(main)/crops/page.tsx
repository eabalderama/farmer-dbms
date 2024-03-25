import { Suspense } from "react";
import CreateCrops from "./CreateCrops";
import CropTable from "./CropTable";

export default function CropsPage() {
  return (
    <main className="min-h-screen items-center p-24">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">Crops</h1>
        <CreateCrops />
      </div>
      <div className="w-full mt-5">
        <Suspense fallback={<>Loading.....</>}>
          <CropTable />
        </Suspense>
      </div>
    </main>
  );
}
