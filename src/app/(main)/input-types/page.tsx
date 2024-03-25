import { Suspense } from "react";
import CreateInputType from "./CreateInputType";
import InputTypeTable from "./InputTypeTable";

export default function InputTypesPage() {
  return (
    <main className="min-h-screen items-center p-24">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">Input Types</h1>
        <CreateInputType />
      </div>
      <div className="w-full mt-5">
        <Suspense fallback={<>Loading.....</>}>
          <InputTypeTable />
        </Suspense>
      </div>
    </main>
  );
}
