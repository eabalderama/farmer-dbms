import { DataTable } from "@/components/DataTable";
import { CropColumns } from "./CropColumns";
import { getCrop } from "@/actions/crop";

export default async function CropTable() {
  const crops = await getCrop();

  const formatted = crops.map((item) => {
    return {
      crop_id: item.crop_id,
      crop_name: item.crop_name,
      planted_count: item._count.planted_crops,
      created_at: item.created_at,
    };
  });

  return <DataTable columns={CropColumns} data={formatted} />;
}
