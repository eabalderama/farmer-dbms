import { getFarmers } from "@/actions/farmer";
import { ThenArg } from "./user";

type TFarmerRow = {
  farmer_id: number;
  name: string;
  email: string;
  planted_crops: number;
  assigned_workers: number;
  created_at: Date;
};

type Farmers = ThenArg<ReturnType<typeof getFarmers>>;
