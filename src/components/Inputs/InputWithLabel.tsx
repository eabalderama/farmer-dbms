import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLInputTypeAttribute } from "react";

interface InputWithLabelProps extends InputProps {
  label: string;
}

export function InputWithLabel(props: InputWithLabelProps) {
  const { label, ...rest } = props;
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={rest.id}>{label}</Label>
      <Input {...rest} />
    </div>
  );
}
