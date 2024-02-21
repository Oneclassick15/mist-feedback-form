import { FormValues, formSchema } from "./types";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { ContactMethodTabs } from "./contact-method-tabs";
import Checkbox from "../ui/checkbox";
import Field from "../ui/field";
import FieldError from "../ui/field-error";
import Input from "../ui/input";
import Label from "../ui/label";
import { SubjectSelector } from "./subject-selector";
import { Loader2 } from "lucide-react";
import { useAppContext } from "../app-context";

export function Form() {
  const { setFormSended } = useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: undefined,
      email: undefined,
      subject: "",
      feedback: "",
      terms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value?.toString() ?? "");
    });

    try {
      const res: { result: "success"; row: number } = await fetch(
        "https://script.google.com/macros/s/AKfycbzaPVEjKTrHX2b98N2Y-0MHspMCtoBrzBVWx_buKIpb_tv6dtSQC3oJ7cr2NR3GFINf/exec",
        {
          method: "POST",
          body: formData,
        },
      ).then((res) => res.json());

      if (res.result === "success") {
        setFormSended(true);
        form.reset();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="p-4 sm:p-8 flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Field>
          <Label
            htmlFor="firstName"
            required
          >
            First Name
          </Label>

          <Input
            id="firstName"
            placeholder="John"
            autoComplete="off"
            {...form.register("firstName", { required: true })}
          />

          {form.formState.errors.firstName && (
            <FieldError>{form.formState.errors.firstName.message}</FieldError>
          )}
        </Field>

        <Field>
          <Label
            htmlFor="lastName"
            required
          >
            Last Name
          </Label>

          <Input
            id="lastName"
            placeholder="Doe"
            autoComplete="off"
            {...form.register("lastName", { required: true })}
          />

          {form.formState.errors.lastName && (
            <FieldError>{form.formState.errors.lastName.message}</FieldError>
          )}
        </Field>

        <ContactMethodTabs defaultValue="phone" />

        <Controller
          control={form.control}
          name="subject"
          render={({ field }) => <SubjectSelector field={field} />}
        />

        <Field>
          <Label
            htmlFor="feedback"
            required
          >
            Feedback
          </Label>

          <textarea
            id="feedback"
            className="min-h-24 px-4 py-3 border-2 border-black font-normal text-lg text-black placeholder:text-black placeholder:text-opacity-40 leading-tight focus-visible:outline-none focus-visible:ring-2 ring-[#dacc41]"
            placeholder="Write your wishes... "
            {...form.register("feedback", { required: true })}
          />

          {form.formState.errors.feedback && (
            <FieldError>{form.formState.errors.feedback.message}</FieldError>
          )}
        </Field>

        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => (
            <Field>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(v)}
                />

                <Label
                  htmlFor="terms"
                  className="font-normal"
                >
                  I consent to the processing of my personal data
                </Label>
              </div>

              {form.formState.errors.terms && (
                <FieldError>{form.formState.errors.terms.message}</FieldError>
              )}
            </Field>
          )}
        />

        <button
          className={cn(
            "flex items-center justify-center h-12 px-4 py-3 border-2 border-black bg-black text-lg text-white leading-none font-semibold focus-visible:outline-none focus-visible:ring-2 ring-[#dacc41] hover:bg-[#7798e1]",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-black",
          )}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting && (
            <Loader2 className="size-5 mr-2 animate-spin" />
          )}
          Send
        </button>
      </form>
    </FormProvider>
  );
}
