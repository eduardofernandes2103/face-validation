import React, { useState } from 'react';
import styles from './styles.module.scss';
// import { UseStepper } from '@/providers/stepper';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import Button from '../button';
import { StepFourProps } from '@/assets/types/stepperProps';
import { UseStepper } from '@/providers/stepper';

const UserStepFour: React.FC<StepFourProps> = ({shouldRender, codeValidation}) => {
  const {nextStep} = UseStepper();

  const webcamRef = React.useRef<any>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  }

  return(
    shouldRender && (
    <div>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: 'white'}}>
      {capturedImage ? (
        <div className={styles.capturedImageContainer}>
          <img src={capturedImage} alt="Captured" style={{ width: '100%', objectFit: 'cover' }}/>
          <div className={styles.buttonContainer}>
            <Button isBorder onClick={() => setCapturedImage(null)}>Tentar novamente</Button>
            <Button isDefault onClick={() => nextStep()}>Salvar foto</Button>
          </div>
        </div>
      ):(
        <>
          <Webcam
            onClick={() => handleCapture()}
            audio={false}
            ref={webcamRef}
            mirrored={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            screenshotFormat="image/png"
          />
          <FontAwesomeIcon icon={faCamera} size={'3x'} className={styles.captureIcon} color={'#ffffff'}  onClick={() => handleCapture()}/>
        </>
        )}
      </div>
    </div>
    )
  )
}

export default UserStepFour;