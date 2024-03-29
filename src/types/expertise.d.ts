import { getExpertise } from "@/actions/expertise";
import { ThenArg } from "./user";

type TExpertiseRow = {
  expertise_id: number;
  expertise_name: string;
  user_count: number;
  created_at: Date;
};

type Expertise = ThenArg<ReturnType<typeof getExpertise>>;
