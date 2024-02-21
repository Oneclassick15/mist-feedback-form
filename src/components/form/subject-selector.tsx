import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import Field from "../ui/field";
import Label from "../ui/label";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormValues } from "./types";

interface SubjectSelectorProps {
  field: ControllerRenderProps<FormValues, "subject">;
}

export function SubjectSelector({ field }: SubjectSelectorProps) {
  const [open, setOpen] = useState(false);
  const selected = field.value;
  const ref = useRef<HTMLDivElement>(null);

  const handleTriggerClick = () => {
    setOpen((prev) => !prev);
  };

  const handleItemClick = (value: string) => {
    field.onChange(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      console.log("CLICK");

      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [open, ref]);

  return (
    <>
      <Field className="relative">
        <Label
          htmlFor="email"
          required
        >
          Subject
        </Label>

        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex items-center justify-start h-12 px-4 py-3 border-2 border-black text-lg leading-none font-normal focus-visible:outline-none focus-visible:ring-2 ring-[#dacc41] hover:bg-black hover:text-white",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-black",
            !selected && "text-black text-opacity-40",
            "data-[state=open]:bg-black data-[state=open]:text-white",
          )}
          data-state={open ? "open" : "closed"}
          onClick={handleTriggerClick}
        >
          {selected ? selected : "Select subject..."}

          {open ? (
            <ChevronsDownUp className="ml-auto size-5" />
          ) : (
            <ChevronsUpDown className="ml-auto size-5" />
          )}
        </button>

        {open && (
          <div
            className="z-50 absolute w-full top-[calc(100%+1rem)] bg-white shadow-md max-h-[calc(3rem*5)] overflow-auto border-2 border-black"
            style={{ scrollbarWidth: "thin" }}
            ref={ref}
          >
            <ul className="">
              {[...Array(10)].map((_, i) => (
                <li
                  role="button"
                  key={i}
                  className="flex items-center justify-start h-12 px-4 py-3 border-b-2 border-black hover:bg-[#7798e1] cursor-pointer last:border-b-0 focus-visible:outline-none focus-visible:bg-[#7798e1]"
                  onClick={() => handleItemClick(`Option ${i + 1}`)}
                  tabIndex={0}
                >
                  Option {i + 1}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Field>
    </>
  );
}
