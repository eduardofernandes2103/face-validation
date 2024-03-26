import { Dispatch, ReactNode, SetStateAction } from "react";

export interface StepperProviderData {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  toastBehavior: boolean;
  setToastBehavior: Dispatch<SetStateAction<boolean>>;
  nextStep: () => void;
  userDocument: string | undefined;
  setUserDocument: Dispatch<SetStateAction<string | undefined>>;
}

export interface StepperProviderProps{
  children?: ReactNode;
}

export interface UseStepperProps {
  maxSteps: number;
}

export interface StepProps {
  shouldRender: boolean;
}

export interface StepFourProps {
  shouldRender: boolean;
  codeValidation: string | string[] | undefined;
}