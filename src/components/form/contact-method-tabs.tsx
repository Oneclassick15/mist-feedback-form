import { cn } from "@/utils/cn";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Field from "../ui/field";
import FieldDescription from "../ui/field-description";
import FieldError from "../ui/field-error";
import Input from "../ui/input";
import Label from "../ui/label";
import { FormValues } from "./types";
import { AsYouType } from "libphonenumber-js";

interface IContactMethodTabsContext {
  currentValue: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>;
}

const ContactMethodTabsContext = React.createContext<IContactMethodTabsContext>(
  {} as IContactMethodTabsContext,
);
// eslint-disable-next-line react-refresh/only-export-components
export const useContactMethodTabsContext = () =>
  React.useContext(ContactMethodTabsContext);

interface ContactMethodTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function ContactMethodTabsComponent(
  { defaultValue, onValueChange, className, ...other }: ContactMethodTabsProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const form = useFormContext<FormValues>();

  const [currentValue, setCurrentValue] = React.useState(defaultValue ?? "");

  React.useEffect(() => {
    onValueChange?.(currentValue);
  }, [currentValue, onValueChange]);

  return (
    <ContactMethodTabsContext.Provider
      value={{ currentValue, setCurrentValue }}
    >
      <div
        ref={ref}
        className={cn("flex flex-col gap-6", className)}
        {...other}
      >
        <Field>
          <div
            role="tablist"
            className="flex border-2 border-black h-12"
          >
            <TabItem
              className="data-[state=active]:bg-[#f98443] data-[state=active]:text-black hover:bg-[#f98443] "
              value="phone"
              onSelect={() => form.setValue("email", undefined)}
            >
              Phone
            </TabItem>

            <div className="w-0.5 bg-black z-[-1]   "></div>

            <TabItem
              className="data-[state=active]:bg-[#4db3a5] data-[state=active]:text-black hover:bg-[#4db3a5]"
              value="email"
              onSelect={() => form.setValue("phone", undefined)}
            >
              Email
            </TabItem>
          </div>

          <FieldDescription>How to contact with you?</FieldDescription>
        </Field>

        <Controller
          control={form.control}
          name="phone"
          render={({ field }) => (
            <TabContent value="phone">
              <Field>
                <Label
                  htmlFor="phone"
                  required
                >
                  Phone
                </Label>

                <Input
                  id="phone"
                  type="tel"
                  placeholder="+380 (__) ___ __ __"
                  autoComplete="off"
                  {...field}
                  value={new AsYouType("UA").input(field.value ?? "")}
                />

                {form.formState.errors.phone && (
                  <FieldError>{form.formState.errors.phone.message}</FieldError>
                )}
              </Field>
            </TabContent>
          )}
        />

        <TabContent value="email">
          <Field>
            <Label
              htmlFor="email"
              required
            >
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="john.doe@ukr.net"
              autoComplete="off"
              {...form.register("email", { required: true })}
            />

            {form.formState.errors.email && (
              <FieldError>{form.formState.errors.email.message}</FieldError>
            )}
          </Field>
        </TabContent>
      </div>
    </ContactMethodTabsContext.Provider>
  );
}

export const ContactMethodTabs = React.forwardRef<
  HTMLDivElement,
  React.PropsWithoutRef<ContactMethodTabsProps>
>(ContactMethodTabsComponent);
ContactMethodTabs.displayName = "ContactMethodTabs";

interface TabItemProps
  extends React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {
  value: string;
  onSelect?: () => void;
}

function TabItemComponent(
  { children, className, value, onSelect, ...other }: TabItemProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { currentValue, setCurrentValue } = useContactMethodTabsContext();

  const handleClick = React.useCallback(() => {
    setCurrentValue(value);
    onSelect?.();
  }, [value, setCurrentValue, onSelect]);

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      className={cn(
        "px-4 py-3 grow hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dacc41] text-lg font-medium leading-none",
        "data-[state=active]:bg-black data-[state=active]:text-white",
        className,
      )}
      aria-selected={value === currentValue}
      data-state={value === currentValue ? "active" : "inactive"}
      tabIndex={0}
      onClick={handleClick}
      {...other}
    >
      {children}
    </button>
  );
}

export const TabItem = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithoutRef<TabItemProps>
>(TabItemComponent);
TabItem.displayName = "TabItem";

interface TabContentProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  value: string;
}

function TabContentComponent(
  { children, className, value, ...other }: TabContentProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { currentValue } = useContactMethodTabsContext();

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn("focus-visible:outline-none", className)}
      data-state={value === currentValue ? "active" : "inactive"}
      {...other}
      hidden={value !== currentValue}
    >
      {value === currentValue && children}
    </div>
  );
}

export const TabContent = React.forwardRef<
  HTMLDivElement,
  React.PropsWithoutRef<TabContentProps>
>(TabContentComponent);
TabContent.displayName = "TabContent";
