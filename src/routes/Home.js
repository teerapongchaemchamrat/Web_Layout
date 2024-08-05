import React from "react";
//import React, { useState, useEffect } from "react";
import "./Home.css";
//import axios from "axios";

function Home() {

  const getUsername = localStorage.getItem('Fullname');

  // const [position, setPosition] = useState({ x: null, y: null });
  // const [dragging, setDragging] = useState(false);
  // const [firstClick, setFirstClick] = useState(true);

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     if (dragging) {
  //       setPosition({
  //         x: event.clientX - event.target.width / 2,
  //         y: event.clientY - event.target.height / 2
  //       });
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     //window.confirm("Do you want to save this position ?");
  //     setDragging(false);
  //     setFirstClick(true);
  //     try{
  //       //const response = axios.put("");

  //     } catch (err) {
  //       console.log("Error save this positon : " + err);
  //     }
      
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);
  //   window.addEventListener('mouseup', handleMouseUp);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //     window.removeEventListener('mouseup', handleMouseUp);
  //   };
  // }, [dragging]);

  // const handleImageMouseDown = (event) => {
  //   if (firstClick) {
  //     const confirmDrag = window.confirm("Do you want to drag the image?");
  //     if (!confirmDrag) {
  //       return;
  //     }
  //     setFirstClick(false);
  //   }

  //   const initialX = event.clientX - event.target.width / 2;
  //   const initialY = event.clientY - event.target.height / 2;

  //   setPosition({ x: initialX, y: initialY });
  //   setDragging(true);
  // };
  
  
  return (
    <div className="home">

      {/* <img 
        src="image/stat0.jpg"
        alt="test"
        onMouseDown={handleImageMouseDown}
        style={{
          cursor: dragging ? "grabbing" : "pointer",
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        /> */}

        <div style={{position: "absolute", marginTop: "-20%"}}>
        <h1>WELCOME ! <br/> {getUsername}</h1>
        </div>
        <div className="stage" style={{marginTop: "15%"}}>
          <div className="table"></div>
          <div className="pc"></div>
          <div className="cup"></div>
          <div className="cup-cover"></div>
          <div className="clock">
            <div className="marker-top"></div>
            <div className="marker-right"></div>
            <div className="marker-bottom"></div>
            <div className="marker-left"></div>
            <div className="pointer-min"></div>
            <div className="pointer-hour"></div>
            <div className="pointer"></div>
          </div>
          <div className="guy">
            <div className="hat">
              <div className="hat-hair"></div>
              <div className="hat-close"></div>
            </div>
            <div className="hair-left"></div>
            <div className="hair-middle"></div>
            <div className="hair-right"></div>
            <div className="ear-left"></div>
            <div className="ear-right"></div>
            <div className="face">
              <div className="eye"></div>
              <div className="eye"></div>
              <div className="nose"></div>
              <div className="mouth"></div>
            </div>
            <div className="neck"></div>
            <div className="body"></div>
          </div>
          <div className="book one"></div>
          <div className="book two"></div>
          <div className="book three"></div>
        </div>
    </div>
  );
}

export default Home;
