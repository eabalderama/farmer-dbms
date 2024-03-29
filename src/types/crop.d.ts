import { getCrop } from "@/actions/crop";
import { ThenArg } from "./user";

type TCropRow = {
  crop_id: number;
  crop_name: string;
  planted_count: number;
  created_at: Date;
};

type Crops = ThenArg<ReturnType<typeof getCrop>>;
