import { Form } from "./components/form/form";
import MISTLogo from "./components/logo";
import { useState } from "react";
import { AppContextProvider } from "./components/app-context";
import { FormSendSuccess } from "./components/form-send-success";
import "./App.css";

function App() {
  const [formSended, setFormSended] = useState(false);

  return (
    <AppContextProvider value={{ formSended, setFormSended }}>
      <div className="w-full sm:w-[500px] border-2 border-black flex flex-col shadow-[0_0_8px_0_rgba(0,0,0,0.25),16px_16px_0_0_#DEE2E6]">
        <header className="flex items-center justify-center p-6 border-b-2 border-black">
          <MISTLogo />
        </header>

        <div className="bg-[#dacc41] px-4 py-3 border-b-2 border-black">
          <h1 className="text-xl font-bold leading-8 text-center">FEEDBACK</h1>
        </div>

        {formSended ? <FormSendSuccess /> : <Form />}
      </div>
    </AppContextProvider>
  );
}

export default App;
