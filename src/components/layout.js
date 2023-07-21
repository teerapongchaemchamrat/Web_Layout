import './layout.css'
import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric'

export const Layout = (props) => {
    const [canvas, setCanvas] = useState('');
    useEffect(() => {
        setCanvas(initCanvas());
      }, []);
      const initCanvas = () => (
        new fabric.Canvas('canvas', {
          height: 800,
          width: 800,
          backgroundColor: 'white'
        })
      )
      return(
        <div>
          <h1>Fabric.js on React - fabric.Canvas('...')</h1>
          <canvas id="canvas" /> 
        </div>
      );
}
    

