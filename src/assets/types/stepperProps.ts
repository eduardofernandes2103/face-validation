import { Dispatch, ReactNode, SetStateAction } from "react";

export interface StepperContextProps{
  step: number;
  nextStep: () => void;
  previousStep: () => void;
  resetStep: () => void;
  userDocument: string;
  setUserDocument: Dispatch<SetStateAction<string>>;
}

export interface StepperProviderProps{
  children?: ReactNode;
}

export interface UseStepperProps {
  maxSteps: number;
}