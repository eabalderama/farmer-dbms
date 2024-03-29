import { DataTable } from "@/components/DataTable";
import { getFarmers } from "@/actions/farmer";
import { TFarmerRow } from "@/types/farmer";
import { PlantedCropColumns } from "./PlantedCropColumns";
import { getPlantedCrops } from "@/actions/planted";
import { TPlantedCropRow } from "@/types/planted-crop";

export default async function PlantedCropTable() {
  const plantedCrops = await getPlantedCrops();

  const formatted: TPlantedCropRow[] = plantedCrops.map((plantedCrop) => {
    return {
      planted_crop_id: plantedCrop.planted_crop_id,
      farmer_id: plantedCrop.farmer_id,
      farmer_name: plantedCrop.farmer.name,
      crop_id: plantedCrop.crop_id,
      crop_name: plantedCrop.crop.crop_name,
      planting_date: plantedCrop.planting_date,
      harvest_date: plantedCrop.harvest_date,
      area: plantedCrop.area,
      created_at: plantedCrop.created_at,
    };
  });

  return <DataTable columns={PlantedCropColumns} data={formatted} />;
}
