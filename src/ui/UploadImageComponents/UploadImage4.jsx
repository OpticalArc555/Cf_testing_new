/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


import { useState, useRef, useEffect } from 'react';
import { IoCameraOutline, IoChevronBack } from 'react-icons/io5';
import { Button } from '@material-tailwind/react';
import { ToastContainer } from 'react-toastify';
 
const UploadImage4 = ({ onClose ,handleCaptureImage,selectfiled }) => {
  const [image, setImage] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [confirmedImage, setConfirmedImage] = useState(null);
  const videoRef = useRef(null);
 
  // const startCamera = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     setCameraStream(stream);
  //     setPreviewMode(true);
  //   } catch (err) {
  //     console.error('Error accessing the camera:', err);
  //   }
  // };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setCameraStream(stream);
      setPreviewMode(true);
    } catch (err) {
      console.error('Error accessing the camera:', err);
    }
  };
 
  const captureImage = async () => {
    if (cameraStream) {
      const videoTrack = cameraStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);
      try {
        const blob = await imageCapture.takePhoto();
        const file = new File([blob], "captured_image.jpg", { type: blob.type });
        handleCaptureImage(file ,selectfiled ,URL.createObjectURL(blob))
        setImage(URL.createObjectURL(blob));
        setPreviewMode(true);
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };
 
  const handleBackClick = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setPreviewMode(false);
    setImage(null);
    setConfirmedImage(null);
    onClose(); // Close the window
  };
 
  const handleRecapture = () => {
    setImage(null);
    setPreviewMode(false);
    startCamera();
  };
 
  const handleDone = () => {
    setConfirmedImage(image);
    setPreviewMode(false);
  };
 
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-4 -ml-8 min-w-[100vw] bg-white">
      
      {!previewMode && !confirmedImage ? (
        <div className="cursor-pointer flex flex-col items-center">
          <IoCameraOutline className="w-16 h-16 mb-4 text-gray-600" />
          <Button className="mt-2" onClick={startCamera}>
            Open Camera
          </Button>
        </div>
      ) : previewMode ? (
        <div className="flex flex-col items-center">
          {!image ? (
            <video
              ref={videoRef}
              autoPlay
              className="object-cover w-full h-full max-w-xs"
            />
          ) : (
            <img
              src={image}
              alt="Preview"
              className="object-cover w-full h-full max-w-xs mt-4"
            />
          )}
          {!image ? (
            <Button size="md" className="mt-4" onClick={captureImage}>
              Capture Photo
            </Button>
          ) : (
            <div className="flex space-x-4 mt-4">
              <Button size="md" onClick={handleRecapture}>
                Recapture
              </Button>
             
            </div>
          )}
          <Button
            size="md"
            className="mt-4 cursor-pointer flex items-center"
            onClick={handleBackClick}
          >
            <IoChevronBack className="w-5 h-5" onClick={handleBackClick} /> Back
          </Button>
        </div>
      ) : confirmedImage ? (
        <div className="flex flex-col items-center">
          <img
            src={confirmedImage}
            alt="Confirmed Preview"
            className="object-cover w-full h-full max-w-xs mt-4"
          />
          <p className="mt-4 text-green-600">Image captured and uploaded successfully!</p>
          <Button
            size="md"
            className="mt-4 cursor-pointer flex items-center"
            onClick={handleBackClick}
          >
            <IoChevronBack className="w-5 h-5" /> OK
          </Button>
        </div>
      ) : null}
      
    </div>
  );
};
 
export default UploadImage4;