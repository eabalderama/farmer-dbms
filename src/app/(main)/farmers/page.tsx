import { Suspense } from "react";
import CreateFarmer from "./CreateFarmer";
import FarmerTable from "./FarmerTable";

export default function FarmersPage() {
  return (
    <main className="min-h-screen items-center p-24">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">Farmers</h1>
        <CreateFarmer />
      </div>
      <div className="w-full mt-5">
        <Suspense fallback={<>Loading.....</>}>
          {/* <ExpertiseTable /> */}
          <FarmerTable />
        </Suspense>
      </div>
    </main>
  );
}
