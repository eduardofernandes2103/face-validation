import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

const QRCodeReader: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string>('');

  const startScanner = () => {
    if (!videoRef.current) return;

    const canvasElement = document.createElement('canvas');
    const canvasContext = canvasElement.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoRef.current!.srcObject = stream;
        videoRef.current!.play();
      })
      .catch(err => {
        console.error('Erro ao acessar a câmera:', err);
      });

    const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        canvasElement.height = videoRef.current.videoHeight;
        canvasElement.width = videoRef.current.videoWidth;
        canvasContext!.drawImage(videoRef.current, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvasContext!.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
        if (code) {
          setResult(code.data);
        }
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  useEffect(() => {
    startScanner();
  }, [])

  return (
    <div>
      {
        result ? (
          <img src={result} alt="Captured" style={{ width: '100%', objectFit: 'cover' }}/>
        ):(
          <>
            <h2> QR-CODE </h2>
            <video ref={videoRef} style={{ width: '100%', maxWidth: '400px' }}></video>
          </>
        )
      }
    </div>
  );
};

export default QRCodeReader;
