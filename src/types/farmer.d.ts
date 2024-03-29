import { getFarmers } from "@/actions/farmer";
import { ThenArg } from "./user";

type TFarmerRow = {
  farmer_id: number;
  name: string;
  email: string;
  planted_crops: number;
  assigned_workers: number;
};

type Farmers = ThenArg<ReturnType<typeof getFarmers>>;
