import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {

    const getUsername = localStorage.getItem('Username');
    const valueSelect = localStorage.getItem('Values_select');
    const locationSelect = localStorage.getItem('Location_select');

    const [step, setStep] = useState(1);
    const [loading, setloading] = useState(false);

    const [Uf_asset_RESID, setUf_asset_RESID] = useState(""); 
    const [Uf_asset_SerialNumber, setUf_asset_SerialNumber] = useState("");
    const [Uf_asset_Contact, setUf_asset_Contact] = useState("");
    const [Uf_asset_ErectricCurrent, setUf_asset_ErectricCurrent]= useState("");
    //const [Uf_asset_Location, setUf_asset_Location] = useState("");
    const [Uf_asset_ModelNumber, setUf_asset_ModelNumber] = useState("");
    const [Uf_asset_PmDurationTime, setUf_asset_PmDurationTime] = useState("");
    const [Uf_asset_PmLink, setUf_asset_PmLink] = useState("");
    const [Uf_asset_StartUsedDate, setUf_asset_StartUsedDate] = useState("");
    const [Uf_asset_UserManual, setUf_asset_UserManual] = useState("");
    const [Uf_asset_Voltage, setUf_asset_Voltage] = useState("");
    const [Uf_asset_Weight, setUf_asset_Weight] = useState("");
    const [Uf_asset_ErectricKw, setUf_asset_ErectricKw] = useState("");
    const [Uf_asset_ExpireDate, setUf_asset_ExpireDate] = useState("");
    const [Uf_asset_department, setUf_asset_department] = useState("");
    const [Uf_asset_inventory_number, setUf_asset_inventory_number] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    const PosXY = useLocation();

    const nextStep = () => {
      // if (Uf_asset_SerialNumber && Uf_asset_Car_Exp && Uf_asset_Compulsory_Exp && Uf_asset_Contact && Uf_asset_ErectricCurrent) {
      // setStep(step + 1);
      // }else {
      //   alert("Please fill out all required fields.");
      // }
      setStep(step + 1);
    };

    const prevStep = () => {
      setStep(step - 1);
    };

    const handleImageUpload = (event) => {
      const selectedImage = event.target.files[0];
      //console.log("Image name: " + selectedImage.name);
      setImage(selectedImage);
    };

    const valueX = PosXY?.state?.valueX || "not found";
    const valueY = PosXY?.state?.valueY || "not found";
    const Uf_asset_Location = PosXY?.state?.Location || "not found";

    const onButtonSubmit = async(e) => {
      e.preventDefault();

      const pointerData = {
        x: valueX,
        y: valueY,
        diameter: "20",
        Uf_asset_RESID: Uf_asset_RESID || null,
        Uf_asset_department: Uf_asset_department || null,
        stat: "1",
        values_select : valueSelect
      };

      console.log('pointerData:', JSON.stringify(pointerData, null, 2));
  
      const resourceData = {
        Uf_asset_RESID: Uf_asset_RESID || null,
        Uf_asset_SerialNumber: Uf_asset_SerialNumber || null,
        Uf_asset_Contact: Uf_asset_Contact || null,
        Uf_asset_ErectricCurrent: Uf_asset_ErectricCurrent || null,
        Uf_asset_Location : locationSelect || null,
        Uf_asset_ModelNumber: Uf_asset_ModelNumber || null,
        Uf_asset_PmDurationTime: Uf_asset_PmDurationTime || null,
        Uf_asset_PmLink: Uf_asset_PmLink || null,
        Uf_asset_StartUsedDate: Uf_asset_StartUsedDate || null,
        Uf_asset_UserManual: Uf_asset_UserManual || null,
        Uf_asset_Voltage: Uf_asset_Voltage || null,
        Uf_asset_Weight: Uf_asset_Weight || null,
        Uf_asset_ErectricKw: Uf_asset_ErectricKw || null,
        Uf_asset_ExpireDate: Uf_asset_ExpireDate || null,
        Uf_asset_department: Uf_asset_department || null,
        Uf_asset_inventory_number: Uf_asset_inventory_number || null,
        create_by : getUsername,
        values_select : valueSelect
      }

      console.log('resourceData:', JSON.stringify(resourceData, null, 2));
      
      const departmentData = {
        dept: Uf_asset_department || null,
        image: image || null
      };
      const config = {
        headers: {
          'content-type': 'multipart/form-data; charset=utf-8',
        },
      };
  
      console.log('departmentData:', JSON.stringify(departmentData, null, 2));

      try {
          setloading(true);
          if (Uf_asset_RESID != null && Uf_asset_SerialNumber != null && Uf_asset_Location != null && Uf_asset_department != null && Uf_asset_StartUsedDate != null && image != null){
            
            // try{
            //   const department_resp = await axios.post("http://192.168.10.27:5000/web/upload", departmentData, config);
            //   const data = department_resp.data;
            //   console.log('Department : ', JSON.stringify(data, null, 2));
            // } catch (error) {
            //   console.error("Error posting Department data:", error.message);
            // }
            // try{
            //   const pointer_resp = await axios.post("http://192.168.10.27:5000/web/pointer/add", pointerData);
            //   const data = pointer_resp.data;
            //   console.log('Pointer : ', JSON.stringify(data, null, 2));
            // } catch (error) {
            //   console.error("Error posting Pointer data:", error.message);
            // }
            // try{
            //   const resource_resp = await axios.post("http://192.168.10.27:5000/web/resource/add", resourceData); 
            //   const data = resource_resp.data; 
            //   console.log('Resource : ', JSON.stringify(data, null, 2));
            // } catch (error) {
            //   console.error("Error posting Resource data:", error.message);
            // }
            //console.log("Image : " + departmentData);
            await axios.post("http://192.168.10.27:5000/web/pointer/add", pointerData);
            await axios.post("http://192.168.10.27:5000/web/resource/add", resourceData); 
            await axios.post("http://192.168.10.27:5000/web/upload", departmentData, config);
            alert("Save successful"); 
            navigate('/home'); 
          } else {
            alert("กรุณากรอกข้อมูลที่มีเครื่องหมาย *** ให้ครบ");
          }
          setloading(false);
      } catch (error) {
        console.error("Error posting registration data:", error.message);
        alert("Error: ", error);
      }

      setUf_asset_RESID("");
      setUf_asset_SerialNumber("");
      setUf_asset_Contact("");
      setUf_asset_ErectricCurrent("");
      setUf_asset_ModelNumber("");
      setUf_asset_PmDurationTime("");
      setUf_asset_PmLink("");
      setUf_asset_StartUsedDate("");
      setUf_asset_UserManual("");
      setUf_asset_Voltage("");
      setUf_asset_Weight("");
      setUf_asset_ErectricKw("");
      setUf_asset_ExpireDate("");
      setUf_asset_department("");
      setUf_asset_inventory_number("");
      setImage(null);
    };

      return (
        <div className="bg">
        <div className="form-container">
      <form className="register-form">
      {step === 1 &&(
        <>
        <h1 align="center">Sign up</h1><br></br>
          
        {/* <h4 align="center">X : {valueX}</h4>
            
        <h4 align="center">Y : {valueY}</h4> */}

        <label>Resource ID : (30) <label style={{color: 'red'}}>***</label></label>
          <input
            className="form-field"
            type="text"
            placeholder="Resource ID"
            name="Uf_asset_RESID"
            maxLength={30}
            value={Uf_asset_RESID}
            onChange={(e) => setUf_asset_RESID(e.target.value)}
            required 
          /> <br />

        <label>Serial Number : (30) <label style={{color: 'red'}}>***</label></label>
          <input
            className="form-field"
            type="text"
            placeholder="SerialNumber"
            name="Uf_asset_SerialNumber"
            maxLength={30}
            value={Uf_asset_SerialNumber}
            onChange={(e) => setUf_asset_SerialNumber(e.target.value)}
            required 
          /> <br />
        
          <label>Contact : (200)</label>
          <input
            className="form-field"
            type="text"
            placeholder="Contact"
            name="Uf_asset_Contact" 
            maxLength={200}
            value={Uf_asset_Contact}
            onChange={(e) => setUf_asset_Contact(e.target.value)}
            required
          /> <br />
    
          <label>ErectricCurrent(A) : (3)</label>
          <input
            className="form-field"
            type="text"
            placeholder="ErectricCurrent"
            name="Uf_asset_ErectricCurrent" 
            maxLength={3}
            value={Uf_asset_ErectricCurrent}
            onChange={(e) => setUf_asset_ErectricCurrent(e.target.value)}
            required
          /> <br />
  
          <h4>&nbsp; Location : {locationSelect}</h4>
          
          <div className="button-container">
            <button className="btn-previous" type="button" onClick={()=>{navigate('/home')}}>Cancel</button>
            <button className="btn-next" type="button" onClick={nextStep} >Next</button>
          </div>
          </>
      )}
          
          {/* <select
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
          </select> */}
        {step === 2 &&(
        <>
        <h1 align="center">Step 2</h1><br></br>
        <label>ModelNumber : (20)</label>
          <input
            className="form-field"
            type="text"
            placeholder="ModelNumber"
            name="Uf_asset_ModelNumber"
            maxLength={20}
            value={Uf_asset_ModelNumber}
            onChange={(e) => setUf_asset_ModelNumber(e.target.value)}
            required
          /> <br />

          <label>PM Duration Time (Hr.) : (int)</label>
          <input
            className="form-field"
            type="number"
            placeholder="PmDurationTime"
            name="Uf_asset_PmDurationTime"
            value={Uf_asset_PmDurationTime}
            onChange={(e) => setUf_asset_PmDurationTime(e.target.value)}
            required
          /> <br />

          <label>PM Document : (100)</label>
          <input
            className="form-field"
            type="text"
            placeholder="PmLink"
            name="Uf_asset_PmLink"
            maxLength={100}
            value={Uf_asset_PmLink}
            onChange={(e) => setUf_asset_PmLink(e.target.value)}
            required
          /> <br />

          <label>StartUsedDate : <label style={{color: 'red'}}>***</label></label>
          <input
            className="form-field"
            type="date"
            placeholder="StartUsedDate"
            name="Uf_asset_StartUsedDate"
            value={Uf_asset_StartUsedDate}
            onChange={(e) => setUf_asset_StartUsedDate(e.target.value)}
            required
          /> <br />

          <label>UserManual : (100)</label>
          <input
            className="form-field"
            type="text"
            placeholder="UserManual"
            name="Uf_asset_UserManual"
            maxLength={100}
            value={Uf_asset_UserManual}
            onChange={(e) => setUf_asset_UserManual(e.target.value)}
            required
          /> <br />

          <label>Voltage : (20)</label>
          <input
            className="form-field"
            type="text"
            placeholder="Voltage"
            name="Uf_asset_Voltage"
            maxLength={20}
            value={Uf_asset_Voltage}
            onChange={(e) => setUf_asset_Voltage(e.target.value)}
            required
          />
          <div className="button-container">
            <button className="btn-previous" type="button" onClick={prevStep}>Previous</button>
            <button className="btn-next" type="button" onClick={nextStep}>Next</button>
          </div>
          </>
        )}

        {step === 3 &&(
        <>
        <h1 align="center">Step 3</h1><br></br>
        <label>Weight (kg) : (decimal)</label>
          <input
            className="form-field"
            type="number" 
            placeholder="Weight"
            name="Uf_asset_Weight"
            value={Uf_asset_Weight}
            onChange={(e) => setUf_asset_Weight(e.target.value)}
            required
          /> <br />

          <label>ElectricPower (kW) : (10)</label>
          <input
            className="form-field"
            type="text"
            placeholder="ErectricKw"
            name="Uf_asset_ErectricKw"
            maxLength={10}
            value={Uf_asset_ErectricKw}
            onChange={(e) => setUf_asset_ErectricKw(e.target.value)}
            required
          /> <br />

          <label>ExpireDate : </label>
          <input
            className="form-field"
            type="date"
            placeholder="ExpireDate"
            name="Uf_asset_ExpireDate"
            value={Uf_asset_ExpireDate}
            onChange={(e) => setUf_asset_ExpireDate(e.target.value)}
            required
          /> <br />

          <label>Department : (100) <label style={{color: 'red'}}>***</label></label>
          <input
            className="form-field"
            type="text"
            placeholder="department"
            name="Uf_asset_department"
            maxLength={100}
            value={Uf_asset_department}
            onChange={(e) => setUf_asset_department(e.target.value)}
            required
          /> <br />

          <label>Inventory_number : (50)</label>
          <input
            className="form-field"
            type="text"
            placeholder="inventory_number"
            name="Uf_asset_inventory_number"
            maxLength={50}
            value={Uf_asset_inventory_number}
            onChange={(e) => setUf_asset_inventory_number(e.target.value)}
            required
          /> <br />

          <label>Image : <label style={{color: 'red'}}>***</label></label>
          <input
            className="form-field"
            type="file"
            name="image"
            onChange={handleImageUpload} 
            required
          />
          <div className="button-container">
            <button className="btn-previous" type="button" onClick={prevStep}>Previous</button>
            <button className="btn-next" type="submit" onClick={onButtonSubmit}>
              Register
            </button>
          </div>
          </>
        )}
      </form>
    </div>

    <Backdrop 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
    </Backdrop>

    </div>
      );
}


