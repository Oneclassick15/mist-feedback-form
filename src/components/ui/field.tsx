import React from "react";
import { cn } from "@/utils/cn";

export interface FieldProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}

function FieldComponent(
  { children, className, ...other }: FieldProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={cn("grid gap-2", className)}
      {...other}
    >
      {children}
    </div>
  );
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(FieldComponent);
Field.displayName = "Field";

export default Field;
