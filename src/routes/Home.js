import React from "react";
import "./Home.css";

function Home() {

  const getUsername = localStorage.getItem('Fullname');
  
  return (
    <div className="home">
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
