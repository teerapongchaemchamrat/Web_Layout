import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './Office_floor_2.css';
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Factory1A() {
    const navigate = useNavigate();
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [image, setImage] = useState(null);
 
  const getCircle = async () => {
    try {
      const response = await axios.get("http://192.168.10.76:8080/web/pointer/location5");
      const fetchedCircles = response.data;

      const newCircles = fetchedCircles.map((circle) => (
        <circle
          key={circle.no}
          cx={circle.x}
          cy={circle.y}
          r={circle.diameter / 2}
          // stroke="black"
          // strokeWidth="1"
          fill="black"
          cursor="pointer"
          fillOpacity="0"
        />
    
      ));

      setCircles(newCircles);
      
    } catch (error) {
      console.error("Error fetching circle data:", error);
    }
  };

  function formatDate(dateString) {
    if (dateString === null) {
      return ""; // Return an empty string if the date is null
    }
    
    const originalDate = new Date(dateString);
    
    // Add 6 hours to the original date
    const modifiedDate = new Date(originalDate.getTime() - 7 * 60 * 60 * 1000);

    // Format the date portion as "dd-MM-yyyy"
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = modifiedDate.toLocaleDateString('nl-NL', dateOptions);

    // Format the time portion as "HH:mm:ss" (24-hour format)
    // const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    // const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(modifiedDate);

    // return `${formattedDate} ${formattedTime}`;
    return `${formattedDate}`;
}

  const getImage = async () => {
    try {
      const response = await axios.get("http://192.168.10.76:8080/web/pointer/location5");
      const fetchedCircles = response.data;

      const newImages = fetchedCircles.map((data) => {
      const imageUrl = data.image_path.replace("D:/Project Web/react/myreact/public/", "");
      //console.log("Image URL: " + imageUrl);
        
        return (
          <Popup key={data.no} 
              trigger=
                {<img className="img-size" 
                    src={imageUrl}
                    alt={data.model}
                    style={{
                        position: "absolute",
                        left: `${data.x}px`,
                        top: `${data.y}px`,
                        cursor: "pointer",
                        transform: "translate(-51%, 26%)", // Center the image
                        opacity: 1.0,
                        filter: data.stat === 0 ? "opacity(60%) brightness(50%) " : "none"
                    }}
                />} modal nested >
                {close => (
                    <div className="modal" style={{ width: `100%`, height: `800px` }}>
                    <div className="header">
                       <h3>Detail Image </h3>
                       </div>
                    <div className="content" style={{ display: 'flex', maxHeight: '650px', overflowY: 'auto' }}>
                      <div className="left-content" style={{ flex: '1', marginRight: '10px' }}>
                      <div className="text-front">
                          <h5>Resource ID : &nbsp;</h5>
                          <div className="text-back">
                          <h5> {data.Uf_asset_RESID}</h5>
                          </div>
                        </div><br />
                        <div className="text-front">
                          <h5>ภาษีรถยนต์ : &nbsp;</h5>
                          <div className="text-back">
                          <h5> {formatDate(data.Uf_asset_Car_Exp)}</h5>
                          </div>
                        </div><br />
                        <div className="text-front">
                          <h5>พ.ร.บ. : &nbsp;</h5>
                          <div className="text-back">
                          <h5>{formatDate(data.Uf_asset_Compulsory_Exp)}</h5>
                          </div>
                        </div><br />
                        <div className="text-front">
                          <h5>Contact : &nbsp;</h5>
                          <div className="text-back">
                          <h5>{data.Uf_asset_Contact}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>ElectricCurrent (A) : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_ErectricCurrent}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>Location : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_Location}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>Model Number : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_ModelNumber}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>PM Duration Time (Hr.) : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_PmDurationTime}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>PM Document : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_PmLink}</h5>
                          </div>
                        </div> <br /> 
                      </div>


                      <div className="right-content" style={{ flex: '1' }}>
                      <div className="text-front">          
                          <h5>Serial Number : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_SerialNumber}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>StartUsedDate : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{formatDate(data.Uf_asset_StartUsedDate)}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>User Manual : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_UserManual}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>Voltage : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_Voltage}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>Weight (kg) : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_Weight}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>ElectricPower (kW) : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_ErectricKw}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>ExpireDate : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{formatDate(data.Uf_asset_ExpireDate)}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>Department : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_department}</h5>
                          </div>
                        </div> <br />
                        <div className="text-front">
                          <h5>inventory_number : &nbsp;</h5>
                          <div className="text-back">
                            <h5>{data.Uf_asset_inventory_number}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="footer">
                      <div className="flex-container">
                        <button className="button-85" onClick={() => {console.log('modal closed '); close();}}>
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
            )}
            </Popup>
        );
    });

      setImage(newImages);

    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  useEffect(() => {
    getCircle();  
  }, []);

  useEffect(() => {
    getImage();  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClickCoords = (event) => {
          // from: https://stackoverflow.com/a/29296049/14198287
    // var e = event.target;
    // var dim = e.getBoundingClientRect();
    const { left, top } = event.currentTarget.getBoundingClientRect();
    var x = event.clientX - left;
    var y = event.clientY - top;
    return [x, y];
    
  };

  const addCircle = async (event) => {
    let [x, y] = getClickCoords(event);
    let diameter = 20;

    const isInsideExistingCircle = circles.some((circle) => { //check area circle
      const circleX = parseInt(circle.props.cx);
      const circleY = parseInt(circle.props.cy);
      const circleRadius = parseInt(circle.props.r);
      const circleArea = Math.PI * circleRadius ** 2;
      const squaredDistance = (x - circleX ) ** 2 + (y - circleY ) ** 2
      return squaredDistance <= circleArea;
    });

          // make new svg circle element
          // more info here: https://www.w3schools.com/graphics/svg_circle.asp
    if (!isInsideExistingCircle) {
    let newCircle = (
      <circle
        key={circles.length + 1}
        cx={x}
        cy={y}
        r={diameter / 2}
        stroke="black"
        strokeWidth="1"
        fill="black"
        cursor="pointer"
      />
      );
          // update the array of circles; you HAVE to spread the current array
          // as 'circles' is immutible and will not accept new info
    let allCircles = [...circles, newCircle ];
          
    setCircles(allCircles);

    setSelectedCircle({
      x: x,
      y: y,
      diameter: diameter,
    });

    console.log("circle" + selectedCircle);
    navigate('/register',{state:{valueX:x, valueY:y, Location:"FACTORY 1A"}} ); //go to page register with parameter

    } else{
      setSelectedCircle(null);
      alert("TEST");
    }
    
  };

  //console.log("this circle",circles);

  return (
    <div className="Container">
        {image}
        <ClickableSVG onClick={addCircle} >
          {/* This loads your circles in the circles hook here */}
          {circles}
        </ClickableSVG>
        
    </div>
    
  );
}

const uniqueIdentifier = Math.floor(Math.random() * 1000000);

const ClickableSVG = styled.svg`
  background: bisque;
  background-image: url(/image/Factory1A.svg?v=${uniqueIdentifier});
  background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  background-size: cover;
  width: 100%; /* Set the width to 100% */
  height: auto; /* Allow the height to adjust proportionally */
  
  @media (min-width: 768px) {
    /* Apply specific styles for screens wider than 768px */
    width: 100%; /* For example, set a specific width */
    height: 100%;
  }
`;