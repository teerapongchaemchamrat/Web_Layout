import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './Layout.css';
import "./EditListing.css";
import axios from "axios";
//import { useNavigate} from "react-router-dom";
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function CustomLayout() { 
   
  const valueSelect = localStorage.getItem('Values_select');
  const getUsername = localStorage.getItem('Username');
  
  const [images, setImages] = useState([]);
  const [loading, setloading] = useState(false);
  const [bgImageUrl, setBgImageUrl] = useState('');
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [openUpdateError, setOpenUpdateError] = useState(false);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`http://192.168.10.27:5000/web/pointer/location/${valueSelect}`);
      const responseImage = response.data;
      const newImages = responseImage.map((data) => ({
        ...data,
        imgURL: data.image_path.replace("D:/Project Web/react/TEST/myreact/public", ""),
        isDragging: false,
        mouseX: 0,
        mouseY: 0,
      }));
      setImages(newImages);
      
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleImageMouseDown = async (event, index) => {
    
    const newImages = [...images];
    const image = newImages[index];
    console.log("Before move -> x:", image.x, "y:", image.y);
    if (image.isDragging) {
      const savePosition = window.confirm("Save position image?");
      if (!savePosition) {
        // User clicked "Cancel", exit the function
        fetchImage();
        return;
      }
      // Paste the image at the current mouse position
      const updatePointer = {
        Uf_asset_RESID: image.Uf_asset_RESID,
        x: image.x,
        y: image.y,
        updateby: getUsername
      };
      try{
        setloading(true);
        await axios.put(`http://192.168.10.27:5000/web/pointer/${image.Uf_asset_RESID}`, updatePointer);
        setloading(false);
        setOpenUpdateSuccess(true);
      }catch (error) {
        console.error("Update pointer Fail : ", error);
        setloading(false);
      }
      console.log('updatePointer:', JSON.stringify(updatePointer, null, 2));

      newImages[index] = {
        ...image,
        x: event.clientX - image.mouseX,
        y: event.clientY - image.mouseY,
        isDragging: false,
        mouseX: 0,
        mouseY: 0,
      };
    } else {
      // Start dragging the image
      const startDragging = window.confirm("Do you want to drag the image?");
      if (!startDragging) {
        // User clicked "Cancel", exit the function
        return;
      }
      newImages[index] = {
        ...image,
        isDragging: true,
        mouseX: event.clientX - image.x,
        mouseY: event.clientY - image.y,
      };
      //window.confirm("Do you want to drag the image?");
    }
    console.log("After move -> x:", newImages[index].x, "y:", newImages[index].y);
    setImages(newImages);
  };

  const handleMouseMove = (event, index) => {
    const newImages = [...images];
    const image = newImages[index];
    if (image.isDragging) {
      newImages[index] = {
        ...image,
        x: event.clientX - image.mouseX,
        y: event.clientY - image.mouseY,
      };
      setImages(newImages);
    }
  };

  const imageLocation = async () => {
    const maxAttempts = 2; // Maximum number of retry attempts
    let currentAttempt = 1;
    while (currentAttempt <= maxAttempts) {
        try {
          setloading(true);
          const response = await axios.get(`http://192.168.10.27:5000/web/location/${valueSelect}`, {timeout: 3000});
          const dataArray = response.data;
        
          if (dataArray && dataArray.length > 0) {
            const data = dataArray[0]; // Assuming you are interested in the first item in the array
            const locationUrl = data.image_location.replace("D:/Project Web/react/TEST/myreact/public", "");
            setBgImageUrl(locationUrl);
            console.log('Complete API response data: ', data);
          } else {
            console.error('Invalid or missing "image_location" property in the API response');
            // Optionally set a default or fallback background image URL
            // setBgImageUrl('/default-image-url.svg'); 
          }
          setloading(false);
          
        } catch (error) {
          console.error("Error fetching Background: ", error); 
        }

        currentAttempt++;
        if (currentAttempt <= maxAttempts) {
          // Wait for a specific duration before retrying (adjust as needed)
          await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
  };

  const uniqueIdentifier = Math.floor(Math.random());

  const ClickableSVG = styled.svg`
      background: bisque;
      background-image: url(${bgImageUrl}?v=${uniqueIdentifier});
      background-size: cover;
      width: 1920px; /* Set the width to 1920px */
      height: 830px; /* Set the height to 880px */
      margin-top: -4.2%;
  `;

  useEffect(() => {
    const fetchData = async () => {
      await imageLocation();
      await fetchImage();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const res = async () => {
  //   const [num_x, setNum_x] = useState('');
  //   const [num_y, setNum_y] = useState('');
    
  //   getClickCoords();
  
  //   const sendData = async () => {
  //     try{
  //     setloading(true);
  //     await axios.post(`http://192.168.10.27:5000/web/pointer/${num_x}`);
  //     setNum_x('');
  //     setNum_y(''); 
  //     setloading(false);
  //     } catch (error) {
  //       console.error("sendData error: " , error);
  //     }
  //   };  
  // };

    return (
      <div className="Container">
          {images.map((image, index) => (
            <div
              key={image.no}
              style={{
                position: 'absolute',
                left: `${image.x}px`,
                top: `${image.y}px`,
                cursor: image.isDragging ? 'grabbing' : 'grab',
                transform: "translate(-51%, 26%)",
                zIndex: 2,
              }}
              onMouseDown={(event) => handleImageMouseDown(event, index)}
              onMouseMove={(event) => handleMouseMove(event, index)}
              onMouseUp={(event) => handleImageMouseDown(event, index)} // Trigger paste on mouse up
            > 
              <img
                className="img-size"
                src={image.imgURL}
                alt={image.Uf_asset_ModelNumber}
              />
              
            </div>
          ))}

      <ClickableSVG/>
      
      <Backdrop 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={openUpdateSuccess} autoHideDuration={4000} onClose={() => setOpenUpdateSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
          <Alert onClose={() => setOpenUpdateSuccess(false)} severity="success">
            Update Successfully!
          </Alert>
        </div>
      </Snackbar>

      <Snackbar open={openUpdateError} autoHideDuration={4000} onClose={() => setOpenUpdateError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
          <Alert onClose={() => setOpenUpdateError(false)} severity="error">
            Update Fail !
          </Alert>
        </div>
      </Snackbar>

    </div>
    );
  }

  