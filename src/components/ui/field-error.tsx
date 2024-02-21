import React from "react";
import { cn } from "@/utils/cn";

export interface FieldErrorProps
  extends React.PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement>> {
  required?: boolean;
}

function FieldErrorComponent(
  { children, className, ...other }: FieldErrorProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "text-red-500 text-base font-normal leading-tight",
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
}

const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  FieldErrorComponent,
);
FieldError.displayName = "FieldError";

export default FieldError;
