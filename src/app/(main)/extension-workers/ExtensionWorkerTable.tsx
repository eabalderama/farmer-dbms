import { getWorkers } from "@/actions/user";
import { DataTable } from "@/components/DataTable";
import { ExtensionWorkerColumns } from "@/app/(main)/extension-workers/ExtensionWorkerColumns";

export default async function ExtensionWorkerTable() {
  const users = await getWorkers();

  const formatted = users.map((user) => {
    return {
      user_id: user.user_id,
      name: user.name,
      email: user.account.email,
      assigned_farmers: user._count.assigned_farmers,
      created_at: user.created_at,
    };
  });
  return <DataTable columns={ExtensionWorkerColumns} data={formatted} />;
}
