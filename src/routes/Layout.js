import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './Layout.css';
import "./EditListing.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function Layout() { 
    const navigate = useNavigate();

    const getUsername = localStorage.getItem('Username');
    const valueRole = localStorage.getItem('RoleType');
    const valueSelect = localStorage.getItem('Values_select');

    const [circles, setCircles] = useState([]);
    const [selectedCircle, setSelectedCircle] = useState(null);
    const [image, setImage] = useState(null);
    const [bgImageUrl, setBgImageUrl] = useState('');
    const [ListLocation, setListLocation] = useState(null);

    const [popupStat, setPopupStat] = useState(false);
    const [popupEdit, setPopupEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [stat, setStat] = useState('');
    //const [checked, setChecked] = useState(true);
    const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
    const [openUpdateError, setOpenUpdateError] = useState(false);
    const [loading, setloading] = useState(false);

    const [Uf_asset_RESID, setUf_asset_RESID] = useState('');
    const [Uf_asset_SerialNumber, setUf_asset_SerialNumber] = useState('');
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
    const [Value_Note , setValue_Note] = useState('');
    
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
      return `${formattedDate}`;
    };

    const getImage = async () => {
      try {
        setloading(true);
        const response = await axios.get(`http://XX.XX.XX.XX:XX/web/pointer/location/${valueSelect}`);
        const responseListLocation = await axios.get("http://XX.XX.XX.XX:XX/web/location");
        setListLocation(responseListLocation.data);
        
        const fetchedCircles = response.data;
  
        const newImages = fetchedCircles.map((data) => {
        const imageUrl = data.image_path.replace("D:/Project Web/react/TEST/myreact/public/", "");
        const redImageUrl = "image/stat0.jpg";
        const orangeImageUrl = "image/stat2.jpg";
        const yellowImageUrl = "image/stat3.jpg";
        const greenImageUrl = "image/stat4.jpg";
          return (
            <Popup key={data.no} 
              trigger={
                <div>
                    {data.stat === 0 && (
                      <img
                          className="img-size"
                          src={redImageUrl} 
                          alt={data.Uf_asset_ModelNumber}
                          style={{
                              position: "absolute",
                              left: `${data.x}px`,
                              top: `${data.y}px`,
                              cursor: "pointer",
                              transform: "translate(-51%, 26%)", // Center the image
                              opacity: 1.0
                          }}
                      />
                    )}
                    {data.stat === 1 && (
                    <img className="img-size" 
                        src={imageUrl}
                        alt={data.Uf_asset_ModelNumber}
                        style={{
                            position: "absolute",
                            left: `${data.x}px`,
                            top: `${data.y}px`,
                            cursor: "pointer",
                            transform: "translate(-51%, 26%)", // Center the image
                            opacity: 1.0,
                            //filter: data.stat === 0 ? "opacity(60%) brightness(50%) " : "none"          
                        }}   />
                    )}
                    {data.stat === 2 && (
                      <img
                          className="img-size"
                          src={orangeImageUrl} 
                          alt={data.Uf_asset_ModelNumber}
                          style={{
                              position: "absolute",
                              left: `${data.x}px`,
                              top: `${data.y}px`,
                              cursor: "pointer",
                              transform: "translate(-51%, 26%)", // Center the image
                              opacity: 1.0
                          }}
                      />
                    )}
                    {data.stat === 3 && (
                      <img
                          className="img-size"
                          src={yellowImageUrl} 
                          alt={data.Uf_asset_ModelNumber}
                          style={{
                              position: "absolute",
                              left: `${data.x}px`,
                              top: `${data.y}px`,
                              cursor: "pointer",
                              transform: "translate(-51%, 26%)", // Center the image
                              opacity: 1.0
                          }}
                      />
                    )}
                    {data.stat === 4 && (
                      <img
                          className="img-size"
                          src={greenImageUrl} 
                          alt={data.Uf_asset_ModelNumber}
                          style={{
                              position: "absolute",
                              left: `${data.x}px`,
                              top: `${data.y}px`,
                              cursor: "pointer",
                              transform: "translate(-51%, 26%)", // Center the image
                              opacity: 1.0
                          }}
                      />
                    )}
                </div>
                } modal nested >
                {close => (
                    <div className="modal" style={{ width: `100%`, height: `800px` }}>
                      <div className="header">
                         <h3>Detail Machine </h3>
                         </div><br/>
                      <div className="content" style={{ display: 'flex', maxHeight: '650px', overflowY: 'auto' }}>
                        <div className="left-content" style={{ flex: '1', marginRight: '10px' }}>
                        <div className="text-front">
                            <h5>Resource ID : &nbsp;</h5>
                            <div className="text-back">
                            <h5> {data.Uf_asset_RESID}</h5>
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
                          <div className="text-front">
                            <h5>Department : &nbsp;</h5>
                            <div className="text-back">
                              <h5>{data.Uf_asset_department}</h5>
                            </div>
                          </div><br />
                          
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
                            <h5>Inventory Number : &nbsp;</h5>
                            <div className="text-back">
                              <h5>{data.Uf_asset_inventory_number}</h5>
                            </div>
                          </div>
                        </div> 
                      </div>
                      
                      <div className="footer"> <br/>
                        {data.stat === 0 &&(
                        <div style={{textAlign: "center"}}>
                            <h2 style={{color : "#FE0000"}}>หมายเหตุ : เครื่องเสีย &nbsp;</h2><br/>
                        </div> 
                        )} 

                        {data.stat === 2 &&(
                        <div style={{textAlign: "center"}}>
                            <h2 style={{color : "#FF6600"}}>หมายเหตุ : เครื่องปกติ (รองาน) &nbsp;</h2><br/>
                        </div> 
                        )} 

                        {data.stat === 3 &&(
                        <div style={{textAlign: "center"}}>
                            <h2 style={{color : "#FFFF01"}}>หมายเหตุ : เครื่องปกติ (รอผลิต) &nbsp;</h2><br/>
                        </div> 
                        )} 

                        {data.stat === 4 &&(
                        <div style={{textAlign: "center"}}>
                            <h2 style={{color : "#92D14F"}}>หมายเหตุ : เครื่องปกติ (รอคุณภาพ) &nbsp;</h2><br/>
                        </div> 
                        )} 

                        <div className="flex-container">
                          {(valueRole === 'Administrator' || valueRole === 'SuperAdministrator' ) && (
                              <button className="button-85" onClick={() => handleEdit(data)}>Edit</button>
                          )}

                          {(valueRole === 'Administrator' || valueRole === 'Production' || valueRole === 'SuperAdministrator') && (
                            <button className="button-85" onClick={() => handleStat(data)}>Status</button>
                          )}

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
        setloading(false);
  
      } catch (error) {
          console.error("Error fetching image data:", error);
      } 
    };

    const imageLocation = async () => {
      const maxAttempts = 2; // Maximum number of retry attempts
      let currentAttempt = 1;
      while (currentAttempt <= maxAttempts) {
          try {
            setloading(true);
            const response = await axios.get(`http://XX.XX.XX.XX:XX/web/location/${valueSelect}`, {timeout: 3000});
            const dataArray = response.data;
          
            if (dataArray && dataArray.length > 0) {
              const data = dataArray[0]; // Assuming you are interested in the first item in the array
              const locationUrl = data.image_location.replace("D:/Project Web/react/TEST/myreact/public", "");
              setBgImageUrl(locationUrl);
              console.log('Complete API response data: ', data);
            } else {
              console.error('Invalid or missing "image_location" property in the API response');
              // Optionally set a default or fallback background image URL
              // setBgImageUrl('/default-image-url.svg');
            }
            setloading(false);
            
          } catch (error) {
            console.error("Error fetching Background: ", error);
          }

          currentAttempt++;
          if (currentAttempt <= maxAttempts) {
            // Wait for a specific duration before retrying (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, 100));
          }
      }
    };

    const uniqueIdentifier = Math.floor(Math.random() * 1000000);
  
    const ClickableSVG = styled.svg`
        background: bisque;
        background-image: url(${bgImageUrl}?v=${uniqueIdentifier});
        background-size: cover;
        width: 1920px; /* Set the width to 1920px */
        height: 830px; /* Set the height to 880px */
        margin-top: -4.2%;
    `;

    useEffect(() => {
      
      const fetchData = async () => {
        //console.log('Fetching image location...');
        await imageLocation();
        //console.log('Fetching image...');
        await getImage();
      };
      console.log('valueSelect changed:', valueSelect);
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueSelect]);

    const getClickCoords = (event) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      var x = event.clientX - left;
      var y = event.clientY - top;
      return [x, y];
      
    };
  
    const addCircle = async (event) => {
      let [x, y] = getClickCoords(event);
      let diameter = 20;
      
      if (valueRole === 'Administrator' || valueRole === 'SuperAdministrator'){
          const isInsideExistingCircle = circles.some((circle) => { //check area circle
            const circleX = parseInt(circle.props.cx);
            const circleY = parseInt(circle.props.cy);
            const circleRadius = parseInt(circle.props.r);
            const circleArea = Math.PI * circleRadius ** 2;
            const squaredDistance = (x - circleX ) ** 2 + (y - circleY ) ** 2;
            return squaredDistance <= circleArea;
          });

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
                
          let allCircles = [...circles, newCircle ];
                
          setCircles(allCircles);
      
          setSelectedCircle({
            x: x,
            y: y,
            diameter: diameter,
          });
      
          console.log("circle" + selectedCircle);
          navigate('/register',{state:{valueX:x, valueY:y}} ); //go to page register with parameter
      
          } else{
            setSelectedCircle(null);
          }
      }
      
    };
  
    //console.log("this circle",circles);
    const handleStat = (data) => {
      setPopupStat(true);
      setUf_asset_RESID(data.Uf_asset_RESID);
      setUf_asset_SerialNumber(data.Uf_asset_SerialNumber);
      setUf_asset_Location(data.Uf_asset_Location);
      setStat(data.stat);
    
    };

    const handleChange = (e) => {
      setStat(e.target.value);
    };
    
    const onButtonSaveStat = async(e) => {
      e.preventDefault();
      try{
         const statDataUpdate = {
            Uf_asset_RESID: Uf_asset_RESID,
            stat: stat
         };
         setloading(true);
         await axios.put(`http://XX.XX.XX.XX:XX/web/pointer/stat/${Uf_asset_RESID}`, statDataUpdate);
         setOpenUpdateSuccess(true);
         setPopupStat(false);

         if (stat === "0") {

            const logData = {
              Uf_asset_RESID : Uf_asset_RESID,
              Part_no : null,
              Part_name : null,
              Quantity : null,
              Note : Value_Note,
              Type : 'แจ้งเสีย',
              update_by : getUsername
            };

            const date = new Date();
            const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const configLineNotify = {
              message: "\n🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧" +
                       "\n1️⃣Resource ID : " + Uf_asset_RESID + 
                       "\n2️⃣Serial Number : " + Uf_asset_SerialNumber +
                       "\n3️⃣สถานที่ : " + Uf_asset_Location +
                       "\n4️⃣⚠️ สาเหตุการเสีย : " + Value_Note + " ⚠️" +
                       "\n5️⃣ผู้แจ้งซ่อม : " + getUsername + 
                       "\n6️⃣วันที่แจ้ง : " + formattedDate
            };      

            //sendEmail(); // send email by EmailJS
            await axios.post(`http://XX.XX.XX.XX:XX/web/log/add`, logData);
            //await axios.get(`http://XX.XX.XX.XX:XX/web/pointer/email/${Uf_asset_RESID}`); // send email by sql
            await axios.post(`http://XX.XX.XX.XX:XX/web/send-notification`, configLineNotify); // Line Notify
        }

        if (stat === "1") {

          const logData = {
            Uf_asset_RESID : Uf_asset_RESID,
            Part_no : null,
            Part_name : null,
            Quantity : null,
            Note : null,
            Type : 'ปกติ',
            update_by : getUsername
          };

          const date = new Date();
            const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const configLineNotify = {
              message: "\n✅✅✅✅✅✅✅✅✅✅✅" +
                       "\n1️⃣Resource ID : " + Uf_asset_RESID + 
                       "\n2️⃣Serial Number : " + Uf_asset_SerialNumber +
                       "\n3️⃣สถานที่ : " + Uf_asset_Location +
                       "\n4️⃣✅ เครื่องสามารถใช้งานได้ตามปกติแล้ว ✅" +
                       "\n5️⃣ผู้แจ้ง : " + getUsername +
                       "\n6️⃣วันที่แจ้ง : " + formattedDate
            }; 
          
          await axios.post(`http://XX.XX.XX.XX:XX/web/log/add`, logData);
          await axios.post(`http://XX.XX.XX.XX:XX/web/send-notification`, configLineNotify); // Line Notify
        }

        getImage();
        setloading(false);

      } catch (error){
            console.log("data serial: " + Uf_asset_RESID);
            console.error("Error updating data:", error);
            setOpenUpdateError(true);
      }
    };

    const handleEdit = (data) => {
      setSelectedItem(data);
      setPopupEdit(true);
      setUf_asset_RESID(data.Uf_asset_RESID);
      setUf_asset_SerialNumber(data.Uf_asset_SerialNumber);
      setUf_asset_Contact(data.Uf_asset_Contact);
      setUf_asset_ErectricCurrent(data.Uf_asset_ErectricCurrent);
      setUf_asset_ModelNumber(data.Uf_asset_ModelNumber);
      setUf_asset_PmDurationTime(data.Uf_asset_PmDurationTime);
      setUf_asset_PmLink(data.Uf_asset_PmLink);
      setUf_asset_StartUsedDate(data.Uf_asset_StartUsedDate);
      setUf_asset_UserManual(data.Uf_asset_UserManual);
      setUf_asset_Voltage(data.Uf_asset_Voltage);
      setUf_asset_Weight(data.Uf_asset_Weight);
      setUf_asset_ErectricKw(data.Uf_asset_ErectricKw);
      setUf_asset_ExpireDate(data.Uf_asset_ExpireDate);
      setUf_asset_department(data.Uf_asset_department);
      setUf_asset_inventory_number(data.Uf_asset_inventory_number);
      setUf_asset_Location(data.Uf_asset_Location);
    };

    const onButtonSubmit = async(e) => {
      e.preventDefault();
        if (!Uf_asset_SerialNumber || !Uf_asset_department || !Uf_asset_RESID || !Uf_asset_Location) {
            setOpenUpdateError(true);
            return;
          }
        try {
            const pointerDataUpdate = { //Update pointer data
                no: selectedItem.no,
                Uf_asset_RESID: Uf_asset_RESID,
                Uf_asset_department: Uf_asset_department
              };
          
              const resourceDataUpdate = {  //Update resource data
                Uf_asset_RESID: selectedItem.Uf_asset_RESID,
                Uf_asset_RESID_update: Uf_asset_RESID || null,
                Uf_asset_SerialNumber: Uf_asset_SerialNumber || null,
                Uf_asset_Contact: Uf_asset_Contact || null,
                Uf_asset_ErectricCurrent: Uf_asset_ErectricCurrent || null,
                Uf_asset_Location : Uf_asset_Location || null,
                Uf_asset_ModelNumber: Uf_asset_ModelNumber || null ,
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
                update_by: getUsername
              };

              console.log('resourceDataUpdate:', JSON.stringify(resourceDataUpdate, null, 2));
          
              const departmentDataUpdate = {
                dept: selectedItem.Uf_asset_department,
                dept_new: Uf_asset_department
              };

              if (Uf_asset_RESID != null || Uf_asset_SerialNumber != null || Uf_asset_Location != null || Uf_asset_department != null || Uf_asset_StartUsedDate != null || Uf_asset_ModelNumber != null)
              {
                  setloading(true);
                  await axios.put(`http://XX.XX.XX.XX:XX/web/pointer/${selectedItem.no}`, pointerDataUpdate);

                  await axios.put(`http://XX.XX.XX.XX:XX/web/resource/${selectedItem.Uf_asset_RESID}`, resourceDataUpdate);

                  await axios.put(`http://XX.XX.XX.XX:XX/web/department/${selectedItem.Uf_asset_department}`, departmentDataUpdate);
                
                  setOpenUpdateSuccess(true);
                  setPopupEdit(false);
                  setloading(false);
                  await getImage();
              } else {
                alert("Error: One or more requests failed");
              }
            } catch (error) {
              console.error("Error updating data:", error);
              
              setOpenUpdateError(true);
          }
    }

    return (
      <div>
        <div className="Container">
              {image}
              
              <ClickableSVG onClick={addCircle} >
                {/* This loads your circles in the circles hook here */}
                {circles}
              </ClickableSVG>
        </div>

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
            
              {/* <ReactSwitch checked={checked} onChange={handleChange} value={stat} className="react-switch" ></ReactSwitch> */}
              
              <Box sx={{ minWidth: 120 , paddingLeft: 20 }}>
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Stat</InputLabel> */}
                  <h3>สถานะเครื่อง : </h3>
                  <select
                    className="select-status"
                    value={stat}
                    label="Stat"
                    onChange={handleChange}
                  >
                    <option value={1}>เครื่องปกติ</option>
                    <option value={2}>เครื่องปกติ (รองาน)</option>
                    <option value={3}>เครื่องปกติ (รอผลิต)</option>
                    <option value={4}>เครื่องปกติ (รอคุณภาพ)</option>
                    <option value={0}>เครื่องเสีย</option>
                  </select>
                </FormControl>
              </Box>
              
            </div> <br /><br />
            {stat === '0' && (
            <div className="text-box-switch">
                <label>สาเหตุการเสีย : (200) <label style={{color: 'red'}}>***</label></label>
                <input
                  className="form-field"
                  type="text"
                  placeholder="กรุณากรอกข้อมูล"
                  name="Value_Note"
                  maxLength={200}
                  value={Value_Note}
                  onChange={(e) => setValue_Note(e.target.value)}
                  required 
                /> <br /><br />
            </div>
            )}
            <button type="button" className="btn-save" style={{marginLeft:"40%"}} onClick={onButtonSaveStat}>Save</button>
            <button type="button" className="btn-cancel" onClick={() => setPopupStat(false)}>Cancel</button>
      </Popup>

      <Popup open={popupEdit} onClose={() => setPopupEdit(false)} 
        contentStyle={{
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            
            }}>
        <div>
          <h1 align="center">Edit Data</h1>
          <form>
            <div className="form-group" style={{maxHeight: '768px', overflowY: 'auto'}}>

            <label htmlFor="Resource ID">Resource ID : <label style={{color: 'red'}}>***</label></label>
            <input
              className="form-field"
              type="text"
              name="Uf_asset_RESID"
              maxLength={30}
              value={Uf_asset_RESID === null ? '' : Uf_asset_RESID}
              onChange={(e) => setUf_asset_RESID(e.target.value)}
              readOnly 
            /> <br />

            <label htmlFor="SerialNumber">Serial Number : <label style={{color: 'red'}}>***</label></label>
            <input
              className="form-field"
              type="text"
              name="Uf_asset_SerialNumber"
              value={Uf_asset_SerialNumber === null ? '' : Uf_asset_SerialNumber}
              onChange={(e) => setUf_asset_SerialNumber(e.target.value)}
              required 
            /> <br />

            <label htmlFor="Contact">Contact : </label>
            <input
              className="form-field"
              type="text"
              name="Uf_asset_Contact" 
              maxLength= {200}
              value={Uf_asset_Contact === null ? '' : Uf_asset_Contact}
              onChange={(e) => setUf_asset_Contact(e.target.value)}
              required
            /> <br />
      
            <label htmlFor="ErectricCurrent">ErectricCurrent(A) : </label>
            <input
              className="form-field"
              type="text"
              name="Uf_asset_ErectricCurrent" 
              maxLength= {3}
              value={Uf_asset_ErectricCurrent === null ? '' : Uf_asset_ErectricCurrent}
              onChange={(e) => setUf_asset_ErectricCurrent(e.target.value)}
              required
            /> <br />

            <label htmlFor="location">Location :  <label style={{color: 'red'}}>***</label></label>
            <select
                  className="form-field-select"
                  value={Uf_asset_Location}
                  onChange={(e) => setUf_asset_Location(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>Choose Location</option>
                  {ListLocation &&
                      ListLocation.map((item) => (
                        <option key={item.values_select}>
                          {item.Uf_asset_Location}
                        </option>
                      ))}
                </select> <br />

          <label htmlFor="ModelNumber">ModelNumber : <label style={{color: 'red'}}>***</label></label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_ModelNumber"
            maxLength= {20}
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
            maxLength= {100}
            value={Uf_asset_PmLink === null ? '' : Uf_asset_PmLink}
            onChange={(e) => setUf_asset_PmLink(e.target.value)}
            required
          /> <br />

          <label htmlFor="PmLink">StartUsedDate : {formatDate(Uf_asset_StartUsedDate)} <label style={{color: 'red'}}>***</label></label>
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
            maxLength= {100}
            value={Uf_asset_UserManual === null ? '' : Uf_asset_UserManual}
            onChange={(e) => setUf_asset_UserManual(e.target.value)}
            required
          /> <br />

          <label htmlFor="Voltage">Voltage : </label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_Voltage"
            maxLength= {20}
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
            maxLength= {10}
            value={Uf_asset_ErectricKw === null ? '' : Uf_asset_ErectricKw}
            onChange={(e) => setUf_asset_ErectricKw(e.target.value)}
            required
          /> <br />

          <label htmlFor="ExpireDate">ExpireDate : {formatDate(Uf_asset_ExpireDate)}</label>
          <input
            className="form-field"
            type="date"
            name="Uf_asset_ExpireDate"
            value={Uf_asset_ExpireDate === null ? '' : Uf_asset_ExpireDate}
            onChange={(e) => setUf_asset_ExpireDate(e.target.value)}
            required
          /> <br />

          <label htmlFor="department">Department : <label style={{color: 'red'}}>***</label></label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_department"
            maxLength= {100}
            value={Uf_asset_department === null ? '' : Uf_asset_department}
            onChange={(e) => setUf_asset_department(e.target.value)}
            required
          /> <br />

          <label htmlFor="inventory_number">Inventory_number : </label>
          <input
            className="form-field"
            type="text"
            name="Uf_asset_inventory_number"
            maxLength= {50}
            value={Uf_asset_inventory_number === null ? '' : Uf_asset_inventory_number}
            onChange={(e) => setUf_asset_inventory_number(e.target.value)}
            required
          />

            </div>
            <button type="button" className="btn-save" onClick={onButtonSubmit}>Update</button>
            <button type="button" className="btn-cancel" onClick={() => setPopupEdit(false)}>Cancel</button>
          </form>
        </div>
      </Popup>

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

      <Backdrop 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      </div>
    );

  }
