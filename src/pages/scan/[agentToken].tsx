import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { dataURItoFile } from '@/utils/image-utils';
import scanController from '@/server/controller/scan/scan-controller';

export default function AgentToken(){
  const webcamRef = React.useRef<any>(null);

  const [ capturedImage, setCapturedImage] = useState<File | null>(null);
  const [ hasFreeTicket, setHasFreeTicket] = useState<boolean>(false);
  const [ shouldScanQR, setShouldScanQR ] = useState<boolean>(false);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const image = dataURItoFile(imageSrc, 'client.jpeg');

      setCapturedImage(image);
    }
  }

  const refreshImage = () => {
    setCapturedImage(null);
    setHasFreeTicket(false);
  }

  useEffect(()=> {
    if(capturedImage !== null){
      const file = {
        file: capturedImage
      }

      scanController.scanImage(file)
        .then((res) => {
          if(res?.response.hasFreeTickets){
            setHasFreeTicket(true);
            return;
          }
          setHasFreeTicket(false);
          setShouldScanQR(true);
          return;
        })
        .catch(() => {setShouldScanQR(true)})
    }
  }, [ capturedImage, setCapturedImage])

  return(
    <>
      <Webcam
        onClick={() => handleCapture()}
        audio={false}
        ref={webcamRef}
        mirrored={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        screenshotFormat="image/jpeg"
      />
      { 
        (!hasFreeTicket && !shouldScanQR) 
        && <FontAwesomeIcon icon={faCamera} size={'3x'} className={styles.captureIcon} color={'#ffffff'}  onClick={() => handleCapture()}/>
      }
      {hasFreeTicket && <button onClick={() => refreshImage()}>Escanear Próximo</button>}
      {shouldScanQR && <button>qr-code</button>}
    </>
  )
}