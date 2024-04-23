import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";

interface InputComponentProps extends InputProps {
  title: string;
  placeholder: string;
  isLoading: boolean;
  field: ControllerRenderProps;
}

export function InputComponent({
  title,
  isLoading,
  field,
  placeholder,
  ...props
}: InputComponentProps) {
  return (
    <FormItem>
      <FormLabel>{title}</FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          disabled={isLoading}
          {...field}
          {...props}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
