import './layout.css'
import React from 'react';
//import { fabric } from 'fabric'

export const Layout = (props) => {
  const numRows = 5;
  const numCols = 5;

  const gridItems = [];
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      gridItems.push(<div key={`${row}-${col}`} className="grid-item"></div>);
    }
  }

  return (
    <div className="grid-container">
      <div className="grid-item">Item 1</div>
      <div className="grid-item">Item 2</div>
      <div className="grid-item">Item 3</div>
      <div className="grid-item">Item 4</div>
      {/* Add more grid items as needed */}
    </div>
  );
}
    

