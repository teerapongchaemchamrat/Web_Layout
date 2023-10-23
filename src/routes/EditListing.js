import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditListing.css";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Popup from 'reactjs-popup';
import ReactSwitch from 'react-switch';
import emailjs from '@emailjs/browser';
import TemplatePPT from '../Background_Web.pptx'
import UploadManual from '../Manual_Upload.pdf'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function DataListing() {

    const [editdata, editdatachange] = useState(null);
   
    const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);
    const [openDeleteError, setOpenDeleteError] = useState(false);

    const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
    const [openUpdateError, setOpenUpdateError] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupStat, setPopupStat] = useState(false);
    const [popupBG, setPopupBG] = useState(false);
    const [checked, setChecked] = useState(true);

    const [Uf_asset_RESID, setUf_asset_RESID] = useState('');
    const [Uf_asset_SerialNumber, setUf_asset_SerialNumber] = useState('');
    const [Uf_asset_Car_Exp, setUf_asset_Car_Exp] = useState('');
    const [Uf_asset_Compulsory_Exp, setUf_asset_Compulsory_Exp] = useState('');
    const [Uf_asset_Contact, setUf_asset_Contact] = useState('');
    const [Uf_asset_ErectricCurrent, setUf_asset_ErectricCurrent]= useState('');
    const [Uf_asset_Location, setUf_asset_Location] = useState('');
    const [Uf_asset_ModelNumber, setUf_asset_ModelNumber] = useState('');
    const [Uf_asset_PmDurationTime, setUf_asset_PmDurationTime] = useState('');
    const [Uf_asset_PmLink, setUf_asset_PmLink] = useState('');
    const [Uf_asset_StartUsedDate, setUf_asset_StartUsedDate] = useState('');
    const [Uf_asset_UserManual, setUf_asset_UserManual] = useState('');
    const [Uf_asset_Voltage, setUf_asset_Voltage] = useState('');
    const [Uf_asset_Weight, setUf_asset_Weight] = useState('');
    const [Uf_asset_ErectricKw, setUf_asset_ErectricKw] = useState('');
    const [Uf_asset_ExpireDate, setUf_asset_ExpireDate] = useState('');
    const [Uf_asset_department, setUf_asset_department] = useState('');
    const [Uf_asset_inventory_number, setUf_asset_inventory_number] = useState('');
    const [stat, setStat] = useState('');
    const [image, setImage] = useState('');

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const Removefunction = (no, Uf_asset_department, Uf_asset_RESID) => {
        if (window.confirm('Do you want to remove?')) {
            deleteData(no, Uf_asset_department, Uf_asset_RESID); 
        }
    };
    
    const deleteData = async (no, Uf_asset_department, Uf_asset_RESID) => {
        try {
            await axios.delete(`http://192.168.10.76:8080/web/pointer/${no}`);
            await axios.delete(`http://192.168.10.76:8080/web/department/${Uf_asset_department}`);
            await axios.delete(`http://192.168.10.76:8080/web/resource/${Uf_asset_RESID}`);
            
            setOpenDeleteSuccess(true);
    
            // Update state to trigger a re-render
            const response = await fetch("http://192.168.10.76:8080/web/pointer/all");
            const resp = await response.json();
            editdatachange(resp);
    
        } catch (error) {
            console.error("Error Delete data:", error);
            setOpenDeleteError(true);
        }
    };
    
    const handleEdit = (item) => {
        setSelectedItem(item);
        setPopupOpen(true);
        setUf_asset_RESID(item.Uf_asset_RESID);
        setUf_asset_SerialNumber(item.Uf_asset_SerialNumber);
        setUf_asset_Car_Exp(item.Uf_asset_Car_Exp);
        setUf_asset_Compulsory_Exp(item.Uf_asset_Compulsory_Exp);
        setUf_asset_Contact(item.Uf_asset_Contact);
        setUf_asset_ErectricCurrent(item.Uf_asset_ErectricCurrent);
        setUf_asset_ModelNumber(item.Uf_asset_ModelNumber);
        setUf_asset_PmDurationTime(item.Uf_asset_PmDurationTime);
        setUf_asset_PmLink(item.Uf_asset_PmLink);
        setUf_asset_StartUsedDate(item.Uf_asset_StartUsedDate);
        setUf_asset_UserManual(item.Uf_asset_UserManual);
        setUf_asset_Voltage(item.Uf_asset_Voltage);
        setUf_asset_Weight(item.Uf_asset_Weight);
        setUf_asset_ErectricKw(item.Uf_asset_ErectricKw);
        setUf_asset_ExpireDate(item.Uf_asset_ExpireDate);
        setUf_asset_department(item.Uf_asset_department);
        setUf_asset_inventory_number(item.Uf_asset_inventory_number);
        setUf_asset_Location(item.Uf_asset_Location);
      };

    const handleImageUpload = (event) => {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
    };

    const handleStat = (item) => {
      setPopupStat(true);
      setUf_asset_RESID(item.Uf_asset_RESID);
      setUf_asset_SerialNumber(item.Uf_asset_SerialNumber);
      setUf_asset_Location(item.Uf_asset_Location);
      setStat(item.stat === 1 ? "0" : "1");
      setChecked(item.stat === 1);
    };

    const handleChange = val => {
      setChecked(val);
      setStat(val ? "1" : "0");
    };

    const onButtonSaveStat = async(e) => {
      e.preventDefault();
      try{
         const statDataUpdate = {
            Uf_asset_RESID: Uf_asset_RESID,
            stat: stat
         };
         await axios.put(`http://192.168.10.76:8080/web/pointer/stat/${Uf_asset_RESID}`, statDataUpdate);
         setOpenUpdateSuccess(true);
         setPopupStat(false);

         if (stat === "0") {
          sendEmail(); // Send email only if stat is 0
        }

         const response = await fetch("http://192.168.10.76:8080/web/pointer/all");
         const resp = await response.json();
         editdatachange(resp);
      } catch (error){
            console.log("data serial: " + Uf_asset_RESID);
            console.error("Error updating data:", error);
            setOpenUpdateError(true);
      }
    };

    const onButtonUploadImage = async(e) =>{
      e.preventDefault();
      if (!Uf_asset_department){
        setOpenUpdateError(true);
        return;
      }
      try{
        const DataUploadImage = {
          dept: Uf_asset_department,
          image: image
        };
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        await axios.post(`http://192.168.10.76:8080/web/upload/bg`, DataUploadImage, config);
        setOpenUpdateSuccess(true);
        setPopupBG(false);
      } catch (error) {
        console.error("Error Upload Image Bg:", error);
        setOpenUpdateError(true);
      }
    }
    
    const onButtonSubmit = async(e) => {
        e.preventDefault();
        if (!Uf_asset_SerialNumber || !Uf_asset_department || !Uf_asset_ModelNumber || !Uf_asset_Location) {
            setOpenUpdateError(true);
            return;
          }
        try {
            const pointerDataUpdate = {
                no: selectedItem.no,
                Uf_asset_RESID: Uf_asset_RESID,
                Uf_asset_department: Uf_asset_department
              };
          
              const resourceDataUpdate = {   //Update resource error 
                Uf_asset_RESID: selectedItem.Uf_asset_RESID,
                Uf_asset_RESID_update: Uf_asset_RESID || null,
                Uf_asset_SerialNumber: Uf_asset_SerialNumber || null,
                Uf_asset_Car_Exp: Uf_asset_Car_Exp || null,
                Uf_asset_Compulsory_Exp: Uf_asset_Compulsory_Exp || null,
                Uf_asset_Contact: Uf_asset_Contact || null,
                Uf_asset_ErectricCurrent: Uf_asset_ErectricCurrent || null,
                Uf_asset_Location : Uf_asset_Location || null,
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
                Uf_asset_inventory_number: Uf_asset_inventory_number || null
              };

              console.log('resourceDataUpdate:', JSON.stringify(resourceDataUpdate, null, 2));
          
              const departmentDataUpdate = {
                dept: selectedItem.Uf_asset_department,
                dept_new: Uf_asset_department
              };

              if (Uf_asset_RESID != null && Uf_asset_SerialNumber != null && Uf_asset_Location != null && Uf_asset_department != null && Uf_asset_StartUsedDate != null)
              {
                  await axios.put(`http://192.168.10.76:8080/web/pointer/${selectedItem.no}`, pointerDataUpdate);

                  await axios.put(`http://192.168.10.76:8080/web/resource/${selectedItem.Uf_asset_RESID}`, resourceDataUpdate);

                  await axios.put(`http://192.168.10.76:8080/web/department/${selectedItem.Uf_asset_department}`, departmentDataUpdate);
                
                  setOpenUpdateSuccess(true);
                  setPopupOpen(false);
              } else {
                alert("Error: One or more requests failed");
              }
            
            const response = await fetch("http://192.168.10.76:8080/web/pointer/all");
            const resp = await response.json();
            editdatachange(resp);
            
        } catch (error) {
            console.error("Error updating data:", error);
            
            setOpenUpdateError(true);
        }
        
    }

    useEffect(() => {
        fetch("http://192.168.10.76:8080/web/pointer/all").then((res) => {
            return res.json();
        }).then((resp) => {
            editdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const buttonback = () => {
      navigate('/home');
    }

    const filteredData = editdata
    ? editdata.filter(item => {
        const searchFields = [item.Uf_asset_RESID]; // fix column filter
        return searchFields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
      })
    : [];

    const sendEmail = () => {
      const date = new Date();
      const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const CurrentDate = date.toLocaleDateString('nl-NL', dateOptions);

      const dataContent = {
        resource: Uf_asset_RESID,
        serialnumber: Uf_asset_SerialNumber,
        location: Uf_asset_Location,
        status: "Stop Working",
        date: CurrentDate 
      }
      emailjs.send('service_3nmi6d8', 'template_6dja9bc', dataContent, 'uF0Gi7qXTufa0aNEz')
      .then((result) => {
        console.log("Send Email: " + result.text);
      }, (error) => {
        console.log("Send Email: " + error.text);
      });
    }

    return(
        <div>
        <section>
            <div className="content-text">
                <h2>CHAIYOOT FACTORY</h2>
                <h2>CHAIYOOT FACTORY</h2>
            </div>
        </section>
        
        <div className="btn-filter">
        <form className="form">
          <label >Resource ID : </label>
          <label htmlFor="search" className="label">Search</label>
          <input id="search" type="search" pattern=".*\S.*" className="input" autoComplete="off"  
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required/>
          <span className="caret"></span>
        </form>
        <button className="btn-upload-bg" onClick={() => setPopupBG(true)}>Upload BG</button>
        <button className="btn-back" onClick={() => buttonback()}>Back</button>
        </div>
        <table className="styled-table">
            <thead>
            <tr>
                <td>NO</td>
                <td>Resource ID</td>
                <td>Department</td>
                <td>Location</td>
                <td>Model</td>
                <td>Action</td>
            </tr>
            </thead>
            <tbody>
            {filteredData.map(item => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td>{item.Uf_asset_RESID}</td>
              <td>{item.Uf_asset_department}</td>
              <td>{item.Uf_asset_Location}</td>
              <td>{item.Uf_asset_ModelNumber}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => Removefunction(item.no, item.Uf_asset_department, item.Uf_asset_RESID)} className="btn-remove">Remove</button>
                <button className="btn-stat" onClick={() => handleStat(item)} >Status</button>
                
              </td>
            </tr>
          ))}
            </tbody>
        </table>

      <Popup open={popupOpen} onClose={() => setPopupOpen(false)} 
        contentStyle={{
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            
            }}>
        <div>
          <h1 align="center">Edit Data</h1>
          <form>
            <div className="form-group" style={{maxHeight: '768px', overflowY: 'auto'}}>

            <label htmlFor="Resource ID">Resource ID : </label>
            <input
              className="form-field"
              type="text"
              name="Uf_asset_RESID"
              value={Uf_asset_RESID === null ? '' : Uf_asset_RESID}
              onChange={(e) => setUf_asset_RESID(e.target.value)}
              required 
            /> <br />

            <label htmlFor="SerialNumber">Serial Number : </label>
            <input
              className="form-field"
              type="text"
              name="Uf_asset_SerialNumber"
              value={Uf_asset_SerialNumber === null ? '' : Uf_asset_SerialNumber}
              onChange={(e) => setUf_asset_SerialNumber(e.target.value)}
              required 
            /> <br />

            <label htmlFor="Car_Exp">ภาษีรถยนต์ : {Uf_asset_Car_Exp}</label>
            <input
              className="form-field"
              type="date"
              name="Uf_asset_Car_Exp" 
              value={Uf_asset_Car_Exp === null ? '' : Uf_asset_Car_Exp}
              onChange={(e) => setUf_asset_Car_Exp(e.target.value)}
              required
            /> <br />

            <label htmlFor="Compulsory_Exp">พ.ร.บ. : {Uf_asset_Compulsory_Exp}</label>
            <input
              className="form-field"
              type="date"
              name="Uf_asset_Compulsory_Exp" 
              value={Uf_asset_Compulsory_Exp === null ? '' : Uf_asset_Compulsory_Exp}
              onChange={(e) => setUf_asset_Compulsory_Exp(e.target.value)}
              required
            /> <br />

            <label htmlFor="Contact">Contact : </label>
            <input
              className="form-field"
              type="text"
              name="Uf_asset_Contact" 
              value={Uf_asset_Contact === null ? '' : Uf_asset_Contact}
              onChange={(e) => setUf_asset_Contact(e.target.value)}
              required
            /> <br />
      
            <label htmlFor="ErectricCurrent">ErectricCurrent(A) : </label>
            <input
              className="form-field"
              type="text"
              name="Uf_asset_ErectricCurrent" 
              value={Uf_asset_ErectricCurrent === null ? '' : Uf_asset_ErectricCurrent}
              onChange={(e) => setUf_asset_ErectricCurrent(e.target.value)}
              required
            /> <br />

            <label htmlFor="location">Location : </label>
            <select
              className="form-field-select"
              value={Uf_asset_Location === null ? '' : Uf_asset_Location}
              onChange={(e) => setUf_asset_Location(e.target.value)}
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

          <label htmlFor="ModelNumber">ModelNumber : </label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_ModelNumber"
            value={Uf_asset_ModelNumber === null ? '' : Uf_asset_ModelNumber}
            onChange={(e) => setUf_asset_ModelNumber(e.target.value)}
            required
          /> <br />

          <label htmlFor="PmDurationTime">PM Duration Time (Hr.) : </label>
          <input
            className="form-field"
            type="number"
            name="Uf_asset_PmDurationTime"
            value={Uf_asset_PmDurationTime === null ? '' : Uf_asset_PmDurationTime}
            onChange={(e) => setUf_asset_PmDurationTime(e.target.value)}
            required
          /> <br />

          <label htmlFor="PmLink">PM Document : </label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_PmLink"
            value={Uf_asset_PmLink === null ? '' : Uf_asset_PmLink}
            onChange={(e) => setUf_asset_PmLink(e.target.value)}
            required
          /> <br />

          <label htmlFor="PmLink">StartUsedDate : {Uf_asset_StartUsedDate}</label>
          <input
            className="form-field"
            type="date"
            name="Uf_asset_StartUsedDate"
            value={Uf_asset_StartUsedDate === null ? '' : Uf_asset_StartUsedDate}
            onChange={(e) => setUf_asset_StartUsedDate(e.target.value)}
            required
          /> <br />

          <label htmlFor="UserManual">UserManual : </label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_UserManual"
            value={Uf_asset_UserManual === null ? '' : Uf_asset_UserManual}
            onChange={(e) => setUf_asset_UserManual(e.target.value)}
            required
          /> <br />

          <label htmlFor="Voltage">Voltage : </label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_Voltage"
            value={Uf_asset_Voltage === null ? '' : Uf_asset_Voltage}
            onChange={(e) => setUf_asset_Voltage(e.target.value)}
            required
          />

          <label htmlFor="Weight">Weight (kg) : </label>
          <input
            className="form-field"
            type="number" 
            name="Uf_asset_Weight"
            value={Uf_asset_Weight === null ? '' : Uf_asset_Weight}
            onChange={(e) => setUf_asset_Weight(e.target.value)}
            required
          /> <br />

          <label htmlFor="ErectricKw">ElectricPower (kW) : </label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_ErectricKw"
            value={Uf_asset_ErectricKw === null ? '' : Uf_asset_ErectricKw}
            onChange={(e) => setUf_asset_ErectricKw(e.target.value)}
            required
          /> <br />

          <label htmlFor="ExpireDate">ExpireDate : {Uf_asset_ExpireDate}</label>
          <input
            className="form-field"
            type="date"
            name="Uf_asset_ExpireDate"
            value={Uf_asset_ExpireDate === null ? '' : Uf_asset_ExpireDate}
            onChange={(e) => setUf_asset_ExpireDate(e.target.value)}
            required
          /> <br />

          <label htmlFor="department">Department : </label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_department"
            value={Uf_asset_department === null ? '' : Uf_asset_department}
            onChange={(e) => setUf_asset_department(e.target.value)}
            required
          /> <br />

          <label htmlFor="inventory_number">Inventory_number : </label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_inventory_number"
            value={Uf_asset_inventory_number === null ? '' : Uf_asset_inventory_number}
            onChange={(e) => setUf_asset_inventory_number(e.target.value)}
            required
          />

            </div>
            <button type="button" className="btn-save" onClick={onButtonSubmit}>Update</button>
            <button type="button" className="btn-cancel" onClick={() => setPopupOpen(false)}>Cancel</button>
          </form>
        </div>
      </Popup>

      <Popup open={popupStat} onClose={() => setPopupStat(false)}
            contentStyle={{
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}>
            <h1 htmlFor="status" align='center'>Status</h1> <br />
            <div style={{display: 'flex'}}>
              <div className="text-switch">
                <h2 value={Uf_asset_RESID}>Resource ID : {Uf_asset_RESID} </h2>
                <h2 style={{ display: 'none' }} value={Uf_asset_SerialNumber}>Serial Number : {Uf_asset_SerialNumber} </h2>
                <h2 style={{ display: 'none' }} value={Uf_asset_Location}>Location : {Uf_asset_Location} </h2>
              </div>
              
            <ReactSwitch checked={checked} onChange={handleChange} value={stat} className="react-switch"></ReactSwitch>
            </div> <br />
            <button type="button" className="btn-save" onClick={onButtonSaveStat}>Save</button>
            <button type="button" className="btn-cancel" onClick={() => setPopupStat(false)}>Cancel</button>
      </Popup>

      <Popup open={popupBG} onClose={() => setPopupBG(false)}
            contentStyle={{
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}>
            <h1 htmlFor="status" align='center'>Upload Background</h1> <br />
            <label>ดาวน์โหลดคู่มือการ Upload ได้ที่นี่ 👉 <a href={UploadManual} download="คู่มือการ Upload Background">Download คู่มือการใช้งาน</a></label><br />
            <label>ดาวน์โหลด PowerPoint ได้ที่นี่ 👉 <a href={TemplatePPT} download="TemplateBackground">Download file</a></label><br /><br />
            <h3 className="txt-upload">โปรดกำหนดชื่อไฟล์ดังนี้</h3>
            <label>OFFICE FLOOR 1 ให้ตั้งชื่อไฟล์เป็น Office_floor_1.svg</label><br />
            <label>OFFICE FLOOR 2 ให้ตั้งชื่อไฟล์เป็น Office_floor_2.svg</label><br />
            <label>OFFICE PD 1 ให้ตั้งชื่อไฟล์เป็น Office_pd_1.svg</label><br />
            <label>OFFICE PD 2 ให้ตั้งชื่อไฟล์เป็น Office_pd_2.svg</label><br />
            <label>FACTORY 1A ให้ตั้งชื่อไฟล์เป็น Factory1A.svg</label><br />
            <label>FACTORY 1B ให้ตั้งชื่อไฟล์เป็น Factory1B.svg</label><br /><br />
          
            <form>
                <label htmlFor="location">Location : </label>
                <select
                  className="form-field-select"
                  value={Uf_asset_department}
                  onChange={(e) => setUf_asset_department(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>Choose Location</option>
                  <option value="Office_floor_1">OFFICE FLOOR 1</option>
                  <option value="Office_floor_2">OFFICE FLOOR 2</option>
                  <option value="Office_pd_1">OFFICE PD 1</option>
                  <option value="Office_pd_2">OFFICE PD 2</option>
                  <option value="Factory1A">FACTORY 1A</option>
                  <option value="Factory1B">FACTORY 1B</option>
                </select> <br />

                <label>Image : </label>
                <label style={{color: 'red'}}>&emsp; &emsp; ***หมายเหตุ ใช้นามสกุล.svg เท่านั้น***</label>
                <input
                  className="form-field"
                  type="file"
                  name="image"
                  accept=".svg"
                  onChange={handleImageUpload}
                  required
                /> <br /><br />

                <button type="button" className="btn-save" onClick={onButtonUploadImage}>Upload</button>
                <button type="button" className="btn-cancel" onClick={() => setPopupBG(false)}>Cancel</button>
            </form>
      </Popup>

      <Snackbar open={openDeleteSuccess} autoHideDuration={4000} onClose={() => setOpenDeleteSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
          <Alert onClose={() => setOpenDeleteSuccess(false)} severity="error">
            Delete Successfully!
          </Alert>
        </div>
      </Snackbar>

      <Snackbar open={openDeleteError} autoHideDuration={4000} onClose={() => setOpenDeleteError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
          <Alert onClose={() => setOpenDeleteError(false)} severity="error">
            Delete Fail !
          </Alert>
        </div>
      </Snackbar>

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
