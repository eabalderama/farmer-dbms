import { Suspense } from "react";
import CreateExpertise from "./CreateExpertise";
import ExpertiseTable from "./ExpertiseTable";

export default function ExpertisePage() {
  return (
    <main className="min-h-screen items-center p-24">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">Expertise</h1>
        <CreateExpertise />
      </div>
      <div className="w-full mt-5">
        <Suspense fallback={<>Loading.....</>}>
          <ExpertiseTable />
        </Suspense>
      </div>
    </main>
  );
}
