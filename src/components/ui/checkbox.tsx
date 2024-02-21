import React, { useCallback } from "react";
import { cn } from "@/utils/cn";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function CheckboxComponent(
  { className, checked, onCheckedChange, ...other }: CheckboxProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const [state, setState] = React.useState(false);

  React.useEffect(() => {
    if (checked !== undefined) {
      setState(checked);
    }
  }, [checked]);

  const handleClick = useCallback(() => {
    setState((old) => {
      const newValue = !old;
      onCheckedChange?.(newValue);
      return newValue;
    });
  }, [onCheckedChange]);

  return (
    <button
      className={cn(
        "peer size-4 shrink-0 border-2 border-black focus-visible:outline-none focus-visible:ring-2 ring-[#dacc41] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black data-[state=checked]:text-white",
        className,
      )}
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={state}
      data-state={state ? "checked" : "unchecked"}
      onClick={handleClick}
      value="on"
      {...other}
    >
      {state && (
        <span className="flex items-center justify-center text-current size-3 pointer-events-none">
          <Check className="size-4" />
        </span>
      )}
    </button>
  );
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  CheckboxComponent,
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
