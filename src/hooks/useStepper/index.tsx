import { useState } from 'react';
import { UseStepperProps } from '@/assets/types/useStepperProps';

function useStepper(maxSteps: number) {
  const stepInitialValue = 1;
  const [step, setStep] = useState(stepInitialValue);
  const [userDocument, setUserDocument] = useState('')

  function nextStep() {
    if (step < maxSteps) {
      setStep(step + 1);
    }
    return;
  }

  function previousStep() {
    if (step > stepInitialValue) {
      setStep(step - 1);
    }

    return;
  }

  function resetStep() {
    setStep(stepInitialValue);
  }

  return {
    step,
    nextStep,
    previousStep,
    resetStep,
    userDocument,
    setUserDocument
  };
}

export default useStepper;