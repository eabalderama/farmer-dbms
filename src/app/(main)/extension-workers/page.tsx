import { getWorkers } from "@/actions/user";
import SideAction from "@/components/CreateUser";
import { DataTable } from "@/components/DataTable";
import { ExtensionWorkerColumns } from "@/components/DataTable/Columns/ExtensionWorkerColumns";

export default async function ExtensionWorkersPage() {
  const users = await getWorkers();

  const formatted = users.map((user) => {
    return {
      user_id: user.user_id,
      name: user.name,
      email: user.account.email,
      assigned_farmers: user._count.assigned_farmers,
    };
  });

  return (
    <main className="min-h-screen items-center p-24">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">Extension Workers</h1>
        <SideAction />
      </div>
      <div className="w-full mt-5">
        <DataTable columns={ExtensionWorkerColumns} data={formatted} />
      </div>
    </main>
  );
}
