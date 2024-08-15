/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {   Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useGetInspectionReportQuery } from '../../services/inspectorapi';

const ExteriorSection = () => {
  const { beadingCarId } = useParams();
 
  const { data } = useGetInspectionReportQuery({ beadingCarId, docType: "Exterior" });
  

  const [formData, setFormData] = React.useState({
    BonnetHood : "",
    RightDoorFront : "",
    LeftDoorFront : "",
    LeftFender: "",
    RightFender: "",

    LeftQuarterPanel: "",
    RightQuarterPanel: "",
    Roof : "",
    DickyDoor : "",
    LeftDoorRear :"",
    RightDoorRear :"",
    LHSFrontTyre : "",
    RHSFrontTyre: "",
    LHSRearTyre:"",
    RHSRearTyre: "",
    SpareTyre: "",
    Windshield: "",
    Light: "",
    FrontBumper: "",
    RearBumper: "",
    LHSHeadlight: "",
    RHSHeadlight: "",
    LHSTaillight: "",
    RHSTaillight: "",
    HeadLightSupport: "",
    RadiatorSupport: "",
    AlloyWheel: "",
    

  });

  const [uploadedImages, setUploadedImages] = useState({
    BonnetHoods: null,
    RightDoorFronts: null,
    LeftDoorFronts: null,
    RightFenders: null,
    LeftQuarterPanels: null,
    RightQuarterPanels: null,
    Roofs: null,
    DickyDoors: null,
    LeftDoorRears: null,
    RightDoorRears: null,
    LHSFrontTyres: null,
    RHSFrontTyres: null,
    LHSRearTyres: null,
    RHSRearTyres: null,
    SpareTyres: null,
    Windshields: null,
    Lights: null,
    FrontBumpers: null,
    RearBumpers: null,
    LHSHeadlights: null,
    RHSHeadlights: null,
    LHSTaillights: null,
    RHSTaillights: null,
    HeadLightSupports: null,
    RadiatorSupports: null,
    AlloyWheels: null,
    CowlTops : null,
    BootFloors: null,
    RightApronLEGs: null,
    LeftApronLEGs: null,
    RightAprons: null,
    LeftAprons: null,
    LeftPillars: null,
    RightPillars: null,
  });

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "BonnetHood":
          setFormData((prev) => ({ ...prev, BonnetHood: item.comment }));
           setUploadedImages((prev) => ({ ...prev, BonnetHoods: item.documentLink }));
          break;
        case "RightDoorFront":
          setFormData((prev) => ({ ...prev, RightDoorFront: item.comment }));
           setUploadedImages((prev) => ({ ...prev, RightDoorFronts: item.documentLink }));
          break;
        case "LeftDoorFront":
          setFormData((prev) => ({ ...prev, LeftDoorFront: item.comment }));
           setUploadedImages((prev) => ({ ...prev, LeftDoorFronts: item.documentLink }));
          break;
        case "RightFender":
          setFormData((prev) => ({ ...prev, RightFender: item.comment }));
           setUploadedImages((prev) => ({ ...prev, RightFenders: item.documentLink }));
          break;
        case "LeftQuarterPanel":
          setFormData((prev) => ({ ...prev, LeftQuarterPanel: item.comment }));
           setUploadedImages((prev) => ({ ...prev, LeftQuarterPanels: item.documentLink }));
          break;
        case "RightQuarterPanel":
          setFormData((prev) => ({ ...prev, RightQuarterPanel: item.comment }));
           setUploadedImages((prev) => ({ ...prev, RightQuarterPanels: item.documentLink }));
          break;
        case "Roof":
          setFormData((prev) => ({ ...prev, Roof: item.comment }));
           setUploadedImages((prev) => ({ ...prev, Roofs: item.documentLink }));
          break;
        case "DickyDoor":
          setFormData((prev) => ({ ...prev, DickyDoor: item.comment }));
           setUploadedImages((prev) => ({ ...prev, DickyDoors: item.documentLink }));
          break;
        case "LeftDoorRear":
          setFormData((prev) => ({ ...prev, LeftDoorRear: item.comment }));
           setUploadedImages((prev) => ({ ...prev, LeftDoorRears: item.documentLink }));
          break;
        case "RightDoorRear":
          setFormData((prev) => ({ ...prev, RightDoorRear: item.comment }));
           setUploadedImages((prev) => ({ ...prev, RightDoorRears: item.documentLink }));
          break;
          case "LHSFrontTyre":
            setFormData((prev) => ({ ...prev, LHSFrontTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, LHSFrontTyres: item.documentLink }));
            break;
          case "RHSFrontTyre":
            setFormData((prev) => ({ ...prev, RHSFrontTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, RHSFrontTyres: item.documentLink }));
            break;
          case "LHSRearTyre":
            setFormData((prev) => ({ ...prev, LHSRearTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, LHSRearTyres: item.documentLink }));
            break;
          case "RHSRearTyre":
            setFormData((prev) => ({ ...prev, RHSRearTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, RHSRearTyres: item.documentLink }));
            break;
          case "SpareTyre":
            setFormData((prev) => ({ ...prev, SpareTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, SpareTyres: item.documentLink }));
            break;
            case "Windshield":
              setFormData((prev) => ({ ...prev, Windshield: item.comment }));
              setUploadedImages((prev) => ({ ...prev, Windshields: item.documentLink }));
              break;
            case "Light":
              setFormData((prev) => ({ ...prev, Light: item.comment }));
              setUploadedImages((prev) => ({ ...prev, Lights: item.documentLink }));
              break;
            case "FrontBumper":
              setFormData((prev) => ({ ...prev, FrontBumper: item.comment }));
              setUploadedImages((prev) => ({ ...prev, FrontBumpers: item.documentLink }));
              break;
            case "RearBumper":
              setFormData((prev) => ({ ...prev, RearBumper: item.comment }));
              setUploadedImages((prev) => ({ ...prev, RearBumpers: item.documentLink }));
              break;
            case "LHSHeadlight":
              setFormData((prev) => ({ ...prev, LHSHeadlight: item.comment }));
              setUploadedImages((prev) => ({ ...prev, LHSHeadlights: item.documentLink }));
              break;
            case "RHSHeadlight":
              setFormData((prev) => ({ ...prev, RHSHeadlight: item.comment }));
              setUploadedImages((prev) => ({ ...prev, RHSHeadlights: item.documentLink }));
              break;
            case "LHSTaillight":
              setFormData((prev) => ({ ...prev, LHSTaillight: item.comment }));
              setUploadedImages((prev) => ({ ...prev, LHSTaillights: item.documentLink }));
              break;
            case "RHSTaillight":
              setFormData((prev) => ({ ...prev, RHSTaillight: item.comment }));
              setUploadedImages((prev) => ({ ...prev, RHSTaillights: item.documentLink }));
              break;
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
  return (
    <div className='p-4 flex-col '>

{/* Exterior Panel */}
     <Typography variant="h4" className='text-black font-bold pb-10'>
      <span >Exterior</span>
      </Typography>

      <Typography variant="h5" className='text-black font-bold pb-4 '>
      <span className='bg-indigo-200 rounded-md p-1 m-1 px-3 '>Exterior Panel</span>
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={3} >
      <Grid item xs={12} sm={6}>
  <Typography variant="body1">Bonnet Hood : {formData.BonnetHood}</Typography>
  {uploadedImages.BonnetHoods && (
    <img
      src={uploadedImages.BonnetHoods}
      alt="Uploaded"
      style={{
        maxWidth: "20%",
        marginTop: "10px",
        cursor: "pointer",
      }}
    />
  )}
</Grid>



        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Door Front : {formData.RightDoorFront}</Typography>
        {uploadedImages.RightDoorFronts && (
          <img
            src={uploadedImages.RightDoorFronts}
            alt="Uploaded"
            style={{
              maxWidth: "20%",
              marginTop: "10px",
              cursor: "pointer",
            }}
           
          />
        )}
      </Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Door Front : {formData.LeftDoorFront}</Typography>
        {uploadedImages.LeftDoorFronts && (
            <img
              src={uploadedImages.LeftDoorFronts}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
             
            />
          )}</Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Fender : {formData.LeftFender}</Typography>
        {uploadedImages.LeftFenders && (
            <img
              src={uploadedImages.LeftFenders}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            
            />
          )}</Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Fender : {formData.RightFender}</Typography>
        {uploadedImages.RightFenders && (
            <img
              src={uploadedImages.RightFenders}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Under Hypothecation */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Quarter Panel : {formData.LeftQuarterPanel}</Typography>
        {uploadedImages.LeftQuarterPanels && (
            <img
              src={uploadedImages.LeftQuarterPanels}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Road Tax Paid */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Quarter Panel : {formData.RightQuarterPanel}</Typography>
        {uploadedImages.RightQuarterPanels && (
            <img
              src={uploadedImages.RightQuarterPanels}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Roof : {formData.Roof}</Typography>
        {uploadedImages.Roofs && (
            <img
              src={uploadedImages.Roofs}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Dicky Door : {formData.DickyDoor}</Typography>
        {uploadedImages.DickyDoors && (
            <img
              src={uploadedImages.DickyDoors}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
       
            />
          )}</Grid>

        {/* Duplicate Key */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Door Rear : {formData.LeftDoorRear}</Typography>
        {uploadedImages.LeftDoorRears && (
            <img
              src={uploadedImages.LeftDoorRears}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Chassis Number Embossing */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Door Rear : {formData.RightDoorRear}</Typography>
        {uploadedImages.RightDoorRears && (
            <img
              src={uploadedImages.RightDoorRears}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        </Grid>
        </div>
      
      <Typography variant="h5" className='text-black font-bold pb-4 pt-5 '>
      <span className='bg-indigo-200 rounded-md p-1 m-1 px-3 '>Tyre</span>
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5}>
       
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">LHS Front Tyre : {formData.LHSFrontTyre}</Typography>
          {uploadedImages.LHSFrontTyres && (
            <img
              src={uploadedImages.LHSFrontTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
             
            />
          )}</Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">RHS Front Tyre : {formData.RHSFrontTyre}</Typography>
        {uploadedImages.RHSFrontTyres && (
            <img
              src={uploadedImages.RHSFrontTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            />
          )}</Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">LHS Rear Tyre : {formData.LHSRearTyre}</Typography>
        {uploadedImages.LHSRearTyres && (
            <img
              src={uploadedImages.LHSRearTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            />
          )}</Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">RHS Rear Tyre : {formData.RHSRearTyre}</Typography>
        {uploadedImages.RHSRearTyres && (
            <img
              src={uploadedImages.RHSRearTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            />
          )}</Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Spare Tyre : {formData.SpareTyre}</Typography>
        {uploadedImages.SpareTyres && (
            <img
              src={uploadedImages.SpareTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            />
          )}</Grid>

      </Grid>
      </div>

<Typography variant="h5" className='text-black font-bold pb-4 pt-5 '>
      <span className='bg-indigo-200 rounded-md p-1 m-1 px-3 '>Windshield and Lights</span>
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5} >
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">Windshield : {formData.Windshield}</Typography>
          {uploadedImages.Windshields && (
            <img
              src={uploadedImages.Windshields}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Light : {formData.Light}</Typography>
        {uploadedImages.Lights && (
            <img
              src={uploadedImages.Lights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>

        {uploadedImages.FrontBumpers && (
            <img
              src={uploadedImages.FrontBumpers}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Rear Bumper : {formData.RearBumper}</Typography>
        {uploadedImages.RearBumpers && (
            <img
              src={uploadedImages.RearBumpers}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">LHS Headlight : {formData.LHSHeadlight}</Typography>
        {uploadedImages.LHSHeadlights && (
            <img
              src={uploadedImages.LHSHeadlights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

        {/* Under Hypothecation */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">RHS Headlight : {formData.RHSHeadlight}</Typography>
        {uploadedImages.RHSHeadlights && (
            <img
              src={uploadedImages.RHSHeadlights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

        {/* Road Tax Paid */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">LHS Taillight : {formData.LHSTaillight}</Typography>
        {uploadedImages.LHSTaillights && (
            <img
              src={uploadedImages.LHSTaillights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">RHS Taillight : {formData.RHSTaillight}</Typography>
        {uploadedImages.RHSTaillights && (
            <img
              src={uploadedImages.RHSTaillights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
             
            />
          )}</Grid>

        

        </Grid>
        </div>

<Typography variant="h5" className='text-black font-bold pb-4 pt-5 '>
      <span className='bg-indigo-200 rounded-md p-1 m-1 px-3 '>Other Components</span>
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5}>
       
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">Head Light Support : {formData.HeadLightSupport}</Typography>
          {uploadedImages.HeadLightSupports && (
            <img
              src={uploadedImages.HeadLightSupports}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            
            />
          )}</Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Radiator Support : {formData.RadiatorSupport}</Typography>
        {uploadedImages.RadiatorSupports && (
            <img
              src={uploadedImages.RadiatorSupports}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Alloy Wheel : {formData.AlloyWheel}</Typography>
        {uploadedImages.AlloyWheels && (
            <img
              src={uploadedImages.AlloyWheels}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

        

      </Grid>
      </div>
    </div>
  );
};

export default ExteriorSection;
