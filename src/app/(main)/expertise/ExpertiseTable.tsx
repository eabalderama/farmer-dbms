import { getExpertise } from "@/actions/expertise";
import { ExpertiseColumns } from "./ExpertiseColumns";
import { DataTable } from "@/components/DataTable";

export default async function ExpertiseTable() {
  const expertise = await getExpertise();

  const formatted = expertise.map((item) => {
    return {
      expertise_id: item.expertise_id,
      expertise_name: item.expertise_name,
      user_count: item._count.user_expertise,
    };
  });

  return <DataTable columns={ExpertiseColumns} data={formatted} />;
}
