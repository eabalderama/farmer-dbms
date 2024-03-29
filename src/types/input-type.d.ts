import { getInputType } from "@/actions/inputType";
import { ThenArg } from "./user";

type TInputTypeRow = {
  input_type_id: number;
  input_name: string;
  crop_count: number;
  created_at: Date;
};

type InputType = ThenArg<ReturnType<typeof getInputType>>;
