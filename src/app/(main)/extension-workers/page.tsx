import SideAction from "@/components/CreateUser";

export default function ExtensionWorkersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">Extension Workers</h1>
        <SideAction />
      </div>
    </main>
  );
}
