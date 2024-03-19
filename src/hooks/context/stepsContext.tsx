
import { createContext } from 'react';
import useStepper from '../useStepper/index';
import { StepperContextProps, StepperProviderProps } from '@/assets/types/stepperProps';

export const StepperContext = createContext<StepperContextProps | undefined>(undefined);

export const StepperProvider = ({ children }:  StepperProviderProps) => {
  const stepper = useStepper({ maxSteps: 5 });
  return (
  <StepperContext.Provider value={stepper}>
    {children}
  </StepperContext.Provider>
  );
};