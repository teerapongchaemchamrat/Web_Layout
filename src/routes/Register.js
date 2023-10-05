import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export default function Register() {

    const [resourceId, setResourceId] = useState("");
    const [model, setModel] = useState("");
    const [location, setLocation] = useState("");
    const [dept, setDept] = useState("");
    const [image, setImage] = useState(null);

    const PosXY = useLocation();

    const handleImageUpload = (event) => {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
    };

    const valueX = PosXY?.state?.valueX || "not found";
    const valueY = PosXY?.state?.valueY || "not found";

    const onButtonSubmit = async(e) => {
      e.preventDefault();

      const pointerData = {
        x: valueX,
        y: valueY,
        diameter: "20",
        resource_id: resourceId,
        dept: dept
      };

      try {
        const response = await axios.post("http://192.168.10.76:8080/web/pointer/add", pointerData);
        console.log("POST Response:", response.data);
        alert("Save pointer successfully");
        //valueX(""); // valueX is not define
        //valueY(""); // valueY is not define
      } catch (error) {
        console.error("Error posting registration data:", error);
        alert("Error data pointer:", error);
      }

      const resourceData = {
        resource_id: resourceId,
        model : model,
        location : location
      }

      try{
        const response = await axios.post("http://192.168.10.76:8080/web/resource/add", resourceData);
        console.log("POST Response:", response.data);
        alert("Save resource successfully");
      } catch (error){
        console.error("Error posting registration data:", error);
        alert("Error data resource:", error)

      }

      const departmentData = {
        dept: dept,
        image: image
      }
      const config = {
        headers : {
            'content-type' : 'multipart/form-data',
        },
      };

      try {
        const response = await axios.post("http://192.168.10.76:8080/web/upload", departmentData, config);
        console.log("POST Response:", response.data);
        alert("Save department successfully");
      } catch (error) {
        console.error("Error posting registration data:", error);
        alert("Error data department:", error);
      }

      setResourceId("");
      setModel("");
      setLocation("");
      setDept("");
      setImage(null);

    
    };

      return (
        <div className="bg">
        <div className="form-container">
      <form className="register-form" >
        <h1 align="center">Sign up</h1><br></br>
          
        <h4 align="center">X : {valueX}</h4>
            {/* <h5 value={valuex} onChange={(e) => setValueX(e.target.value)}>{valueX}</h5> */}
        <h4 align="center">Y : {valueY}</h4>
            {/* <h5 value={valuey} onChange={(e) => setValueY(e.target.value)}>{valueY}</h5> */}
          
          <input
            className="form-field"
            type="text"
            placeholder="Resource ID"
            name="resource"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            required 
          />
       
          <input
            className="form-field"
            type="text"
            placeholder="Model"
            name="model" 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
    
          {/* <input
            className="form-field"
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          /> */}

          <select
            className="form-field-select"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="" disabled hidden>Choose Location</option>
            <option value="OFFICE FLOOR 1">OFFICE FLOOR 1</option>
            <option value="OFFICE FLOOR 2">OFFICE FLOOR 2</option>
            <option value="OFFICE PD 1">OFFICE PD 1</option>
            <option value="OFFICE PD 2">OFFICE PD 2</option>
            <option value="FACTORY 1A">FACTORY 1A</option>
            <option value="FACTORY 1B">FACTORY 1B</option>
          </select>

          <input
            className="form-field"
            type="text"
            placeholder="Department"
            name="department"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            required
          />

          <input
            className="form-field"
            type="file"
            name="image"
            onChange={handleImageUpload}
            required
          />
          <button className="form-field" type="submit" onClick={onButtonSubmit}>
            Register
          </button>
        
      </form>
    </div>
    </div>
      );

      
}


