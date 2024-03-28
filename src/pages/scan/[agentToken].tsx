import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { dataURItoFile } from '@/utils/image-utils';
import scanController from '@/server/controller/scan/scan-controller';
import AlertSuccessModal from '@/components/modal/AlertSuccessModal';
import AlertErrorModal from '@/components/modal/AlertErrorModal';
import { useMobile } from '@/hooks/useMobile';
import RedirectToMobile from '@/components/redirectToMobile';
import QRCodeReader from '@/components/qrReader';
import Button from '@/components/button';

export default function AgentToken(){
  const isMobile = useMobile();

  const webcamRef = React.useRef<any>(null);

  const [ capturedImage, setCapturedImage] = useState<File | null>(null);
  const [ hasFreeTicket, setHasFreeTicket] = useState<boolean>(false);
  const [ shouldScanQRModal, setShouldScanQRModal ] = useState<boolean>(false);
  const [ shouldOpenQRCam, setShouldOpenQRCam ] = useState<boolean>(false)

  const videoConstraints = {
    facingMode: "environment"
  };

  const handleCapture = () => {
    if (webcamRef.current && !hasFreeTicket && !shouldScanQRModal) {
      const imageSrc = webcamRef.current.getScreenshot();
      const image = dataURItoFile(imageSrc, 'client.jpeg');

      setCapturedImage(image);
    }
  }

  const refreshImage = () => {
    setCapturedImage(null);
    setHasFreeTicket(false);
    setShouldScanQRModal(false);
    setShouldOpenQRCam(false);
  }

  const openQRCodeScan = () => {
    setCapturedImage(null);
    setShouldScanQRModal(false);
    setShouldOpenQRCam(true);
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
          setShouldScanQRModal(true);
          return;
        })
        .catch(() => {setShouldScanQRModal(true)})
    }
  }, [ capturedImage, setCapturedImage ])

  return(
    <>
      <div className={styles.scanContainer}>
        {
          shouldOpenQRCam ? (
            <>
              <div className={styles.qrCodeContainer}>
                <QRCodeReader />
                <button onClick={() => refreshImage()}>Escanear Rosto</button>
              </div>
            </>
          ) : (
            <Webcam
              onClick={() => handleCapture()}
              audio={false}
              ref={webcamRef}
              mirrored={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          )
        }
        { 
          (!hasFreeTicket && !shouldScanQRModal && !shouldOpenQRCam) 
          && <FontAwesomeIcon icon={faCamera} size={'3x'} className={styles.captureIcon} color={'#ffffff'}  onClick={() => handleCapture()}/>
        }
        {hasFreeTicket && <AlertSuccessModal onCloseModal={() => refreshImage()} />}
        {shouldScanQRModal && <AlertErrorModal onCloseModal={() => openQRCodeScan()} />}
      </div>
      <RedirectToMobile isDesktop={isMobile === false && true} />
    </>
  )
}
