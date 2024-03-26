import { createContext, useContext, useEffect, useState } from 'react';
import { StepperProviderData, StepperProviderProps } from '@/assets/types/stepperProps';

const StepContext = createContext<StepperProviderData>({} as StepperProviderData);

export const StepperProvider = ({ children }: StepperProviderProps) => {
  const stepInitialValue = 1;
  const maxSteps = 5
  const [step, setStep] = useState<number>(stepInitialValue);
  const [toastBehavior, setToastBehavior] = useState<boolean>(false);
  const [userDocument, setUserDocument] = useState<string | undefined>('');

  function nextStep() {
    if (step < maxSteps) {
      setStep(step + 1);
    }
  }

  return (
    <StepContext.Provider value={{
      step, 
      setStep, 
      toastBehavior, 
      setToastBehavior, 
      userDocument, 
      setUserDocument, 
      nextStep
    }}
    >
      {children}
    </StepContext.Provider>
  )
}

export const UseStepper = () => useContext(StepContext);