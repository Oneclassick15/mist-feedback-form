import { cn } from "@/utils/cn";
import { useAppContext } from "./app-context";
import { MailCheck } from "lucide-react";

export function FormSendSuccess() {
  const { setFormSended } = useAppContext();
  return (
    <div className="p-4 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center items-center">
          <MailCheck className="size-24" />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Thank you! Your feedback has been successfully sent!
          </h1>
        </div>
      </div>

      <button
        className={cn(
          "flex items-center justify-center h-12 px-4 py-3 border-2 border-black bg-black text-lg text-white leading-none font-semibold focus-visible:outline-none focus-visible:ring-2 ring-[#dacc41] hover:bg-[#4db3a5]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-black",
        )}
        onClick={() => setFormSended(false)}
      >
        Send another feedback
      </button>
    </div>
  );
}
