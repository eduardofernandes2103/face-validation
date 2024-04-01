import React, { useState } from 'react';
import styles from './styles.module.scss';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import Button from '../button';
import { StepFourProps } from '@/assets/types/stepperProps';
import { UseStepper } from '@/providers/stepper';
import ticketsController from '@/server/controller/tickets/tickets-controller';
import Loading from '../loading';
import { dataURItoFile } from '@/utils/image-utils';

const UserStepFour: React.FC<StepFourProps> = ({shouldRender, codeValidation}) => {
  const {nextStep, userDocument, setStep, setToastBehavior} = UseStepper();

  const webcamRef = React.useRef<any>(null);

  const [ capturedImage, setCapturedImage] = useState<File | null>(null);
  const [ capturedImageSrc, setCapturedImageSrc] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const image = dataURItoFile(imageSrc, `${userDocument}.jpeg`)

      setCapturedImage(image);
      setCapturedImageSrc(imageSrc);
    }
  }

  const sendImageAndDocument = (image: any ) => {
    const cpf = `${userDocument}`
    const codeToken = `${codeValidation}`
    const file = {
      file: image
    }

    setIsLoading(true);
    ticketsController.generateCredentialsImage(file, codeToken, cpf)
      .then(() => {
        nextStep();
      })
      .catch(() => {
        setToastBehavior(true);
        setStep(3);
        setCapturedImage(null);
        setIsLoading(false);
      })
  }

  return(
    shouldRender && (
      isLoading ? (
        <Loading />
      ) : (
        <div>
          <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: 'white'}}>
          {capturedImage ? (
            <div className={styles.capturedImageContainer}>
              <img src={capturedImageSrc} alt="Captured" style={{ width: '100%', objectFit: 'cover' }}/>
              <div className={styles.buttonContainer}>
                <Button isBorder onClick={() => setCapturedImage(null)}>Tentar novamente</Button>
                <Button isDefault onClick={() => sendImageAndDocument(capturedImage)}>Salvar foto</Button>
              </div>
            </div>
          ):(
            <>
              <Webcam
                onClick={() => handleCapture()}
                audio={false}
                ref={webcamRef}
                mirrored={true}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                screenshotFormat="image/jpeg"
              />
              <FontAwesomeIcon icon={faCamera} size={'3x'} className={styles.captureIcon} color={'#ffffff'}  onClick={() => handleCapture()}/>
            </>
            )}
          </div>
        </div>
      )
    )
  )
}

export default UserStepFour;