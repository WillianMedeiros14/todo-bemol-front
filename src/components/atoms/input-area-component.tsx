import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputProps } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";

import { Textarea, TextareaProps } from "@/components/ui/textarea";

interface InputComponentProps extends TextareaProps {
  title: string;
  placeholder: string;
  isLoading: boolean;
  field: ControllerRenderProps;
}

export function InputAreComponent({
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
        <Textarea
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
