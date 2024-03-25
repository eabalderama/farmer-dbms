import { Suspense } from "react";
import ExtensionWorkerTable from "./ExtensionWorkerTable";
import CreateUser from "./CreateUser";

export default function ExtensionWorkersPage() {
  return (
    <main className="min-h-screen items-center p-24">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">Extension Workers</h1>
        <CreateUser />
      </div>
      <div className="w-full mt-5">
        <Suspense fallback={<>Loading.....</>}>
          <ExtensionWorkerTable />
        </Suspense>
      </div>
    </main>
  );
}
