import React, { useState } from "react";
import styled from "styled-components";

export default function Office_floor_2() {
  const [circles, setCircles] = useState([]);

  const getClickCoords = (event) => {
    // from: https://stackoverflow.com/a/29296049/14198287
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    return [x, y];
  };

  const addCircle = (event) => {
    // get click coordinates
    let [x, y] = getClickCoords(event);


    // make new svg circle element
    // more info here: https://www.w3schools.com/graphics/svg_circle.asp
    let newCircle = (
      <circle
        key={circles.length + 1}
        cx={x}
        cy={y}
        r="10"
        stroke="black"
        strokeWidth="1"
        fill="black"
  
      />
    );

    // update the array of circles; you HAVE to spread the current array
    // as 'circles' is immutible and will not accept new info
    let allCircles = [...circles, newCircle];

    // update 'circles'
    setCircles(allCircles);
  };

  console.log(circles);

  const onMouseOverHandler = () => {
    alert("Image 1 Alert!!!");
  };

  return (
    <Container>
      <ClickableSVG onClick={addCircle} onChange={onMouseOverHandler}>
        {/* This loads your circles in the circles hook here */}
        {circles}
        
      </ClickableSVG>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  hieght: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ClickableSVG = styled.svg`
  width: 1920px;
  height: 849px;
`;


// export default Office_floor_2;
