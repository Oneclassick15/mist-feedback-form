import React from "react";
import { cn } from "@/utils/cn";

export interface FieldDescriptionProps
  extends React.PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement>> {
  required?: boolean;
}

function FieldDescriptionComponent(
  { children, className, ...other }: FieldDescriptionProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "text-black text-opacity-40 text-base font-normal leading-tight",
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
}

const FieldDescription = React.forwardRef<
  HTMLDivElement,
  FieldDescriptionProps
>(FieldDescriptionComponent);
FieldDescription.displayName = "FieldDescription";

export default FieldDescription;
