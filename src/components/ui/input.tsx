import React from "react";
import { cn } from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

function InputComponent(
  { className, ...other }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "min-w-0 h-12 flex border-2 border-black  grow px-4 py-3 font-normal text-lg text-black placeholder:text-black placeholder:text-opacity-40 leading-none focus-visible:outline-none focus-visible:ring-2 ring-[#dacc41]",
        className,
      )}
      type="text"
      {...other}
    />
  );
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(InputComponent);
Input.displayName = "Input";

export default Input;
