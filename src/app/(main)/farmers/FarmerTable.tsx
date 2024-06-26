import { DataTable } from "@/components/DataTable";
import { FarmerColumns } from "./FarmerColumns";
import { getFarmers } from "@/actions/farmer";
import { TFarmerRow } from "@/types/farmer";

export default async function FarmerTable() {
  const farmers = await getFarmers();

  const formatted: TFarmerRow[] = farmers.map((farmer) => {
    return {
      farmer_id: farmer.farmer_id,
      name: farmer.name,
      email: farmer.email || "",
      planted_crops: farmer._count.planted_crops,
      assigned_workers: farmer._count.assigned_workers,
      created_at: farmer.created_at,
    };
  });

  return <DataTable columns={FarmerColumns} data={formatted} />;
}
