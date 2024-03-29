import { getFarmers } from "@/actions/farmer";
import { ThenArg } from "./user";
import { Crops } from "./crop";
import { Farmers } from "./farmer";

type TPlantedCropRow = {
  planted_crop_id: number;
  crop_id: number;
  crop_name: string;
  farmer_id: number;
  farmer_name: string;
  harvest_date: Date | null;
  planting_date: Date | null;
  area: number | null;
  created_at: Date;
};

type PlantedCrops = ThenArg<ReturnType<typeof getFarmers>>;
