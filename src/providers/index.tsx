import { ProvidersProps } from "@/assets/types/providerProps";
import { StepperProvider } from "./stepper";

const Providers = ({ children }: ProvidersProps) => {
  return (
    <StepperProvider>{children}</StepperProvider>
  );
};

export default Providers;
