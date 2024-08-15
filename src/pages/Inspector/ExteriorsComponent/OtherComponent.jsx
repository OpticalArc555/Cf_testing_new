/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Grid,
  Typography,
  Button,
  Modal,
  makeStyles,
  
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UploadImage4 from '../../../ui/UploadImageComponents/UploadImage4';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    maxWidth: '90%',
    maxHeight: '90%',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
}));

const 
OtherComponent = ({  handleCameraModal, 
  userRole, 
  handleCaptureImage, 
  handleSubmitWithoutImage, 
  data, 
  formData, 
  setFormData, 
  handleFileChange, 
  uploadedImages, 
  setUploadedImages,
  captureModalOpen,
  setCaptureModalOpen,
  selectedLable,
  handleChange,handleImageClick,fileInputRef }) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
       
        case "HeadLightSupport":
          setFormData((prev) => ({ ...prev, HeadLightSupport: item.comment }));
          setUploadedImages((prev) => ({ ...prev, HeadLightSupports: item.documentLink }));
          break;
        case "RadiatorSupport":
          setFormData((prev) => ({ ...prev, RadiatorSupport: item.comment }));
          setUploadedImages((prev) => ({ ...prev, RadiatorSupports: item.documentLink }));
          break;
        case "AlloyWheel":
          setFormData((prev) => ({ ...prev, AlloyWheel: item.comment }));
          setUploadedImages((prev) => ({ ...prev, AlloyWheels: item.documentLink }));
          break;
        default:
          break;
      }
    });
  }, [data]);



  // const handleImageClick = (image) => {
  //   setSelectedImage(image);
  //   setOpenModal(true);
  // };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <div className='p-4'>
      
      <Typography variant="h4" className='text-black font-bold pb-5 pt-16 '>
        Other Components
      </Typography>
      <Grid container spacing={3}>
        {/* Head Light Support */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Head Light Support</InputLabel>
            <Select
            required
              name="HeadLightSupport"
              value={formData.HeadLightSupport}
              onChange={handleChange}
              color="Green"
              
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
            </Select>
          </FormControl>
          <div className='flex gap-5'>  
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } size="small" variant="contained" color="success">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" onClick={handleCaptureImage} className="cursor-pointer flex items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageClick}
            />
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {uploadedImages.HeadLightSupports && (
            <img
              src={uploadedImages.HeadLightSupports}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(uploadedImages.HeadLightSupports)}
            />
          )}
        </Grid>

        {/* Radiator Support */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Radiator Support</InputLabel>
            <Select
            required
              name="RadiatorSupport"
              value={formData.RadiatorSupport}
              onChange={handleChange}
              color="Green"
              
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
            </Select>
          </FormControl>
          <div className='flex gap-5'>  
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } size="small" variant="contained" color="success">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" onClick={handleCaptureImage} className="cursor-pointer flex items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageClick}
            />
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {uploadedImages.RadiatorSupports && (
            <img
              src={uploadedImages.RadiatorSupports}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(uploadedImages.RadiatorSupports)}
            />
          )}
        </Grid>

        {/* Alloy Wheel */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Alloy Wheel</InputLabel>
            <Select
            required
              name="AlloyWheel"
              value={formData.AlloyWheel}
              onChange={handleChange}

            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
            </Select>
          </FormControl>
          <div className='flex gap-5'>  
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } size="small" variant="contained" color="success">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" onClick={handleCaptureImage} className="cursor-pointer flex items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageClick}
            />
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {uploadedImages.AlloyWheels && (
            <img
              src={uploadedImages.AlloyWheels}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(uploadedImages.AlloyWheels)}
            />
          )}
        </Grid>
      </Grid>

      {/* Modal for displaying clicked image */}
      <Modal
        open={captureModalOpen}
        onClose={() => setCaptureModalOpen(false)}
        // className={classes.modal}
      >
        <div className={classes.paper}>
          <UploadImage4
            isOpen={captureModalOpen}
            onClose={() => setCaptureModalOpen(false)}
            onCapture={handleCaptureImage}
            handleCaptureImage = {handleFileChange}
            selectfiled = {selectedLable}
          />
        </div>
 
       
      </Modal>

      
      
    </div>
  );
};

export default OtherComponent;
