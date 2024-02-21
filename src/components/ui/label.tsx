import React from "react";
import { cn } from "@/utils/cn";

export interface LabelProps
  extends React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>> {
  required?: boolean;
}

function LabelComponent(
  { children, className, required, ...other }: LabelProps,
  ref: React.ForwardedRef<HTMLLabelElement>,
) {
  return (
    <label
      ref={ref}
      className={cn("text-black text-lg font-semibold leading-none", className)}
      {...other}
    >
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(LabelComponent);
Label.displayName = "Label";

export default Label;
