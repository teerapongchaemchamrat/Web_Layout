import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './Office_floor_2.css';
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Office_PD_2() {

  const navigate = useNavigate();
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [image, setImage] = useState(null);
 
  const getCircle = async () => {
    try {
      const response = await axios.get("http://192.168.10.76:8080/web/pointer/location4");
      const fetchedCircles = response.data;

      const newCircles = fetchedCircles.map((circle) => (
        <circle
          key={circle.no}
          cx={circle.x}
          cy={circle.y}
          r={circle.diameter / 2}
          stroke="black"
          strokeWidth="1"
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

  const getImage = async () => {
    try {
      const response = await axios.get("http://192.168.10.76:8080/web/pointer/location4");
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
                      opacity: 1.0
                  }}
              />} modal nested >
              {close => (
                  <div className="modal">
                    <div className="header">
                       <h3>Detail Image </h3>
                       </div>
                    <div className="content">
                      <h5>Resource_ID : {data.resource_id}</h5>
                      <br />
                      <h5>Model : {data.model}</h5>
                      <br />
                      <h5>Department : {data.dept}</h5>
                      <br />
                      <h5>Location : {data.location}</h5>
                    </div>
                    
                    <div className="footer">
                      <div className="flex-container">
                        <button className="button-85" onClick={() => {console.log('modal closed '); close();}}>
                          Close
                        </button>
                        <button className="button-85" >
                          Update
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
    getImage();
       
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
    navigate('/register',{state:{valueX:x, valueY:y, Location:"OFFICE PD 2"}} ); //go to page register with parameter

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

const ClickableSVG = styled.svg`
  background: bisque;
  background-image: url(../image/table.svg);
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
