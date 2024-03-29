import { DataTable } from "@/components/DataTable";
import { InputTypeColumns } from "./InputTypeColumns";
import { getInputType } from "@/actions/inputType";

export default async function InputTypeTable() {
  const inputTypes = await getInputType();

  const formatted = inputTypes.map((item) => {
    return {
      input_type_id: item.input_type_id,
      input_name: item.input_name,
      crop_count: item._count.crop_inputs,
      created_at: item.created_at,
    };
  });

  return <DataTable columns={InputTypeColumns} data={formatted} />;
}
