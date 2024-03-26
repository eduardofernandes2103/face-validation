import { useRouter } from "next/router";
import Toast from "@/components/toast";
import { UseStepper } from "@/providers/stepper";
import UserStepOne from "@/components/userSteps/UserStep1";
import UserStepTwo from "@/components/userSteps/UserStep2";
import UserStepThree from "@/components/userSteps/UserStep3";
import UserStepFour from "@/components/userSteps/UserStep4";
import UserStepFive from "@/components/userSteps/UserStep5";

export default function CodeToken(){
  const router = useRouter();
  const codeToken = router.query.codeToken
  const { step, toastBehavior, setToastBehavior } = UseStepper()

  return(
    <>
      <UserStepOne shouldRender={step === 1 ? true : false} />
      <UserStepTwo shouldRender={step === 2 ? true : false} />
      <UserStepThree shouldRender={step === 3 ? true : false} />
      <UserStepFour shouldRender={step === 4 ? true : false} codeValidation={codeToken}/>
      <UserStepFive shouldRender={step === 5 ? true : false} />
      <Toast 
        type="error"
        toastTitle="Ops ..." 
        shouldOpenToast={toastBehavior}
        shouldCloseToast={() => setToastBehavior(false)} 
      >A Selfie que você enviou não cumpre as nossas diretrizes, tente novamente!</Toast>
    </>
  )
}