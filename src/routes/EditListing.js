import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditListing.css";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Popup from 'reactjs-popup';
//import ReactSwitch from 'react-switch';
//import emailjs from '@emailjs/browser';
// import TemplatePPT from '../Background_Web.pptx'
// import UploadManual from '../Manual_Upload.pdf'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function DataListing() {

    const getUsername = localStorage.getItem('Username');

    const [editdata, editdatachange] = useState(null);
    const [BgLocation, setBgLocation] = useState(null);
   
    const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);
    const [openDeleteError, setOpenDeleteError] = useState(false);

    const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
    const [openUpdateError, setOpenUpdateError] = useState(false);

    const [openWithdrawSuccess, setopenWithdrawSuccess] = useState(false);
    const [openWithdrawError, setopenWithdrawError] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    //const [popupStat, setPopupStat] = useState(false);
    const [popupBG, setPopupBG] = useState(false);
    //const [checked, setChecked] = useState(true);
    const [popupWithdraw, setPopupWithdraw] = useState(false);
    const [stockSparePart, setstockSparePart] = useState(null);
    const [loading, setloading] = useState(false);

    const [selectedParts, setSelectedParts] = useState([]);
    const [selectedLogs, setSelectedLogs] = useState([]);

    // const [selectCount, setSelectCount] = useState(1);

    // const handleAddButtonClick = () => {
    //   setSelectCount(prevCount => prevCount + 1);
    // }

    // const handleDelButtonClick = () => {
    //   setSelectCount(prevCount => prevCount - 1);
    // }

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
    //const [stat, setStat] = useState('');
    const [image, setImage] = useState('');

    const [Part_no, setPart_no] = useState('');
    const [Part_name, setPart_name] = useState('');
    let [Quantity, setQuantity] = useState(1); 
    const [DefaultQty, setDefaultQty] = useState('');

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const Removefunction = (no, Uf_asset_department, Uf_asset_RESID) => {
        if (window.confirm('Do you want to remove?')) {
            deleteData(no, Uf_asset_department, Uf_asset_RESID); 
        }
    };
    
    const deleteData = async (no, Uf_asset_department, Uf_asset_RESID) => {
        try {
            setloading(true);
            await axios.delete(`http://192.168.10.27:5000/web/pointer/${no}`);
            await axios.delete(`http://192.168.10.27:5000/web/department/${Uf_asset_department}`);
            await axios.delete(`http://192.168.10.27:5000/web/resource/${Uf_asset_RESID}`);
            
            setOpenDeleteSuccess(true);
    
            // Update state to trigger a re-render
            const response = await fetch("http://192.168.10.27:5000/web/pointer/all");
            const resp = await response.json();
            editdatachange(resp);
            setloading(false);
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

    // const handleStat = (item) => {
    //   setPopupStat(true);
    //   setUf_asset_RESID(item.Uf_asset_RESID);
    //   setUf_asset_SerialNumber(item.Uf_asset_SerialNumber);
    //   setUf_asset_Location(item.Uf_asset_Location);
    //   setStat(item.stat === 1 ? "0" : "1");
    //   setChecked(item.stat === 1);
    // };

    // const handleChange = val => {
    //   setChecked(val);
    //   setStat(val ? "1" : "0");
    // };

    // const onButtonSaveStat = async(e) => {
    //   e.preventDefault();
    //   try{
    //      const statDataUpdate = {
    //         Uf_asset_RESID: Uf_asset_RESID,
    //         stat: stat
    //      };

    //      const logData ={
    //         Uf_asset_RESID : Uf_asset_RESID,
    //         Part_no : null,
    //         Part_name : null,
    //         Quantity : null,
    //         Note : 'แจ้งเสีย'
    //      };

    //      await axios.put(`http://192.168.10.114:93/web/pointer/stat/${Uf_asset_RESID}`, statDataUpdate);
    //      setOpenUpdateSuccess(true);
    //      setPopupStat(false);

    //      if (stat === "0") {
    //       sendEmail(); // Send email only if stat is 0
    //       await axios.post(`http://192.168.10.27:8080/web/log/add`, logData)
    //     }

    //      const response = await fetch("http://192.168.10.114:93/web/pointer/all");
    //      const resp = await response.json();
    //      editdatachange(resp);
    //   } catch (error){
    //         console.log("data serial: " + Uf_asset_RESID);
    //         console.error("Error updating data:", error);
    //         setOpenUpdateError(true);
    //   }
    // };

    const onButtonUploadImage = async(e) => {
      e.preventDefault();
      if (!Uf_asset_Location){
        setOpenUpdateError(true);
        return;
      }
      try{
        setloading(true);
        const DataUploadImage = {
          Uf_asset_Location: Uf_asset_Location,
          image: image
        };
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        await axios.post(`http://192.168.10.27:5000/web/upload/bg/new`, DataUploadImage, config);
        setOpenUpdateSuccess(true);
        setPopupBG(false);
        setloading(false);
      } catch (error) {
        console.error("Error Upload Image Bg:", error);
        setOpenUpdateError(true);
      }
    }
    
    const onButtonSubmit = async(e) => {
        e.preventDefault();
        if (!Uf_asset_SerialNumber || !Uf_asset_department || !Uf_asset_RESID || !Uf_asset_Location) {
            setOpenUpdateError(true);
            return;
          }
        try {
            setloading(true);
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
                  await axios.put(`http://192.168.10.27:5000/web/pointer/${selectedItem.no}`, pointerDataUpdate);

                  await axios.put(`http://192.168.10.27:5000/web/resource/${selectedItem.Uf_asset_RESID}`, resourceDataUpdate);

                  await axios.put(`http://192.168.10.27:5000/web/department/${selectedItem.Uf_asset_department}`, departmentDataUpdate);
                
                  setOpenUpdateSuccess(true);
                  setPopupOpen(false);
              } else {
                alert("Error: One or more requests failed");
              }
            
            const response = await fetch("http://192.168.10.27:5000/web/pointer/all");
            const resp = await response.json();
            editdatachange(resp);
            setloading(false);

        } catch (error) {
            console.error("Error updating data:", error);
            
            setOpenUpdateError(true);
        }
        
    }

    const fetchPointerAll = async () => {
      try {
        setloading(true);
        const response = await axios.get('http://192.168.10.27:5000/web/pointer/all');
        editdatachange(response.data);
        setloading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        alert("Error fetching data");
      }
    };

    const fetchSparepartAll = async () => {
      try {
        setloading(true);
        const response = await axios.get('http://192.168.10.27:5000/web/sparepart/all');
        setstockSparePart(response.data);
        setloading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    
    useEffect(() => {
      const fetchData = async () => {
        await fetchPointerAll();
        await fetchSparepartAll();
      }
      fetchData();
    }, []);

    // useEffect(() => {
    //     fetch("http://192.168.10.27:5000/web/pointer/all").then((res) => {
    //         return res.json();
    //     }).then((resp) => {
    //         editdatachange(resp);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     })
        
    // }, []);

  //   useEffect(() => {
  //     fetch("http://192.168.10.27:5000/web/location").then((res) => {
  //         return res.json();
  //     }).then((resp) => {
  //         setBgLocation(resp);
  //     }).catch((err) => {
  //         console.log(err.message);
  //     })
  // }, []);

    const buttonback = () => {
      navigate('/home');
    };

    const filteredData = editdata
    ? editdata.filter(item => {
        const searchFields = [item.Uf_asset_RESID]; // fix column filter
        return searchFields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
      })
    : [];

    // const sendEmail = () => {
    //   const date = new Date();
    //   const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    //   const CurrentDate = date.toLocaleDateString('nl-NL', dateOptions);

    //   const dataContent = {
    //     resource: Uf_asset_RESID,
    //     serialnumber: Uf_asset_SerialNumber,
    //     location: Uf_asset_Location,
    //     status: "Stop Working",
    //     date: CurrentDate 
    //   }
    //   emailjs.send('service_6oju5zk', 'template_s8zinja', dataContent, 'u2G-71zzuU8byo7kE') 
    //   .then((result) => {
    //     console.log("Send Email: " + result.text);
    //   }, (error) => {
    //     console.log("Send Email: " + error.text);
    //   });
    // }

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

      // Format the time portion as "HH:mm:ss" (24-hour format)
      // const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      // const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(modifiedDate);

      // return `${formattedDate} ${formattedTime}`;
      return `${formattedDate}`;
  }

  const handleWithdraw = (item) => {
    setPopupWithdraw(true);
    setSelectedItem(item);
    setUf_asset_RESID(item.Uf_asset_RESID);
    setPart_no(item.Part_no);
    setPart_name(item.Part_name);
    setDefaultQty(item.Quantity);
  };

//   useEffect(() => {
//     fetch("http://192.168.10.27:5000/web/sparepart/all").then((res) => {
//         return res.json();
//     }).then((response) => {
//         setstockSparePart(response);
//     }).catch((err) => {
//         console.log(err.message);
//     })
// }, []);

//console.log('data:', JSON.stringify(stockSparePart, null, 2));

function incrementCount() {
  if (Quantity === '' || Quantity < 30){
      Quantity = Quantity + 1;
      setQuantity(Quantity);
  }
}
function decrementCount() {
  if (Quantity === '' || Quantity > 1){
      Quantity = Quantity - 1;
      setQuantity(Quantity);
  }
}

function onButtonClose(){
  setPopupWithdraw(false);
  setSelectedParts([]);
  setSelectedLogs([]);
}

const onButtonWithdrawStock = async(e) => {
  e.preventDefault();
  try {
      if (selectedParts.length === 0){
        alert("กรุณาเพิ่มรายการเบิก");
        return;
      } 
        for (let i = 0; i < selectedParts.length; i++) {
          const partData = selectedParts[i];
          const logData = selectedLogs[i];
          setloading(true);
          await axios.put(`http://192.168.10.27:5000/web/sparepart/minus/stock/${partData.Part_no}`, partData);
          await axios.post(`http://192.168.10.27:5000/web/log/add`, logData);
          //console.log("part data: ",JSON.stringify(partData, null, 2));
          //console.log("log data: ",JSON.stringify(logData, null, 2));
        }
         
        setPopupWithdraw(false);
        setopenWithdrawSuccess(true);
        setSelectedParts([]);
        setSelectedLogs([]);
        setloading(false);

  }catch (error){
      setopenWithdrawError(true);
      console.log("Error Withdraw stock: ", error);
  }
}

const handleAddButtonClick = () => {
  if (Part_name === '' || Part_name === undefined) {
      alert("Please choose part");
      return;
  }

  if (Quantity > DefaultQty) {
      alert("จำนวนอะไหล่ไม่เพียงพอ");
      return;
  }

  const newParts = {
    Part_no : Part_no,
    Minus_Quantity : Quantity
  }
  const newLogs = {
    Uf_asset_RESID: Uf_asset_RESID,
    Part_no: Part_no,
    Part_name: Part_name,
    Quantity: Quantity,
    Note: null,
    Type: 'เบิกอะไหล่',
    update_by: getUsername
  };

  setSelectedParts([...selectedParts, newParts]);
  setSelectedLogs([...selectedLogs, newLogs]);
  setPart_name(''); 
  setQuantity(1);
};

//console.log('part:', JSON.stringify(selectedParts, null, 2));
//console.log('log:', JSON.stringify(selectedLogs, null, 2));

const handleDelButtonClick = () => {

  const lenParts = selectedParts.length;
  if(lenParts === 0){
    alert("Not found");
    return;
  }
  const updatedParts = [...selectedParts];
  updatedParts.pop();
  const updatedLogs = [...selectedLogs];
  updatedLogs.pop();
  setSelectedParts(updatedParts);
  setSelectedLogs(updatedLogs);
};

const onClickUploadBG = async() => {
  setPopupBG(true)
  try{
    setloading(true);
    const response = await axios.get("http://192.168.10.27:5000/web/location");
    setBgLocation(response.data);
    setloading(false);
  } catch (error) {
    console.error("Fetch list page error : " , error);
  }
};

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
        <button className="btn-upload-bg" onClick={onClickUploadBG}>Upload BG</button>
        <button className="btn-upload-bg" onClick={() => navigate("/sparepart")}>Spare Part</button>
        <button className="btn-back" onClick={() => buttonback()}>Back</button>
        </div>
        <div style={{ overflow: 'auto', maxHeight: '750px' }}>
        <table className="styled-table">
            <thead style={{ position: 'sticky', top: '0', background: '#fff' }}>
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
                {/* <button className="btn-stat" onClick={() => handleStat(item)} >Status</button> */}
                {item.stat === 0 && (
                <button className="btn-stat" onClick={() => handleWithdraw(item)}>เบิกอะไหล่</button>
                )}
              </td>
            </tr>
          ))}
            </tbody>
        </table>
        </div>
        

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
                  {BgLocation &&
                      BgLocation.map((item) => (
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
            <button type="button" className="btn-cancel" onClick={() => setPopupOpen(false)}>Cancel</button>
          </form>
        </div>
      </Popup>

      {/* <Popup open={popupStat} onClose={() => setPopupStat(false)}
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
      </Popup> */}

      <Popup open={popupBG} onClose={() => setPopupBG(false)}
            contentStyle={{
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}>
            <h1 htmlFor="status" align='center'>Upload Background</h1> <br />

            <label>ปรับขนาดรูปภาพได้ที่นี่ 👉 &nbsp;<a href="https://www.iloveimg.com/resize-image" target="_blank" rel="noreferrer">Resize image</a></label><br/><br/>
            <label>แปลงไฟล์เป็น .SVG ได้ที่นี่ 👉 &nbsp;<a href="https://products.groupdocs.app/th/conversion/jpg-to-svg" target="_blank" rel="noreferrer">Convert JPEG To SVG</a></label><br/><br/>
            {/* <label>ดาวน์โหลดคู่มือการ Upload ได้ที่นี่ 👉 <a href={UploadManual} download="คู่มือการ Upload Background">Download คู่มือการใช้งาน</a></label><br />
            <label>ดาวน์โหลด PowerPoint ได้ที่นี่ 👉 <a href={TemplatePPT} download="TemplateBackground">Download file</a></label><br /><br />
            <h3 className="txt-upload">โปรดกำหนดชื่อไฟล์ดังนี้</h3>
            <label>OFFICE FLOOR 1 ให้ตั้งชื่อไฟล์เป็น Office_floor_1.svg</label><br />
            <label>OFFICE FLOOR 2 ให้ตั้งชื่อไฟล์เป็น Office_floor_2.svg</label><br />
            <label>OFFICE PD 1 ให้ตั้งชื่อไฟล์เป็น Office_pd_1.svg</label><br />
            <label>OFFICE PD 2 ให้ตั้งชื่อไฟล์เป็น Office_pd_2.svg</label><br />
            <label>FACTORY 1A ให้ตั้งชื่อไฟล์เป็น Factory1A.svg</label><br />
            <label>FACTORY 1B ให้ตั้งชื่อไฟล์เป็น Factory1B.svg</label><br /><br /> */}
          
            <form>
                <label htmlFor="location">Location : </label>
                <select
                  className="form-field-select"
                  value={Uf_asset_Location}
                  onChange={(e) => setUf_asset_Location(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>Choose Location</option>
                  {BgLocation &&
                      BgLocation.map((item) => (
                        <option key={item.values_select}>
                          {item.Uf_asset_Location}
                        </option>
                      ))}
                </select> <br />
              
                <label>Image : </label>
                <label style={{color: 'red'}}>&emsp; &emsp; ***หมายเหตุ ชื่อไฟล์ห้ามมีช่องว่าง/เว้นวรรค (spacebar) และใช้นามสกุล .svg เท่านั้น***</label>
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

      <Popup open={popupWithdraw} onClose={() => setPopupWithdraw(false)}
            contentStyle={{
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}>
            <h1 htmlFor="status" align='center'>เบิกอะไหล่</h1> <br />
            <label htmlFor="PartName" style={{display:"none", padding: "10px"}}>Resource : {Uf_asset_RESID} </label><br />
            <label htmlFor="PartName" style={{display:"none", padding: "10px"}}>Part No : {Part_no} </label><br />
            
            <div style={{ marginLeft:"15%", marginRight:"15%"}}>
                <label htmlFor="PartName" style={{padding: "10px"}}>Part Name : </label>
                <select
                  className="form-field-select"
                  style={{width : "40%"}}
                  value={Part_name}
                  onChange={(e) => {
                    setPart_name(e.target.value);
                    const selectedPart = stockSparePart.find(item => item.Part_name === e.target.value);
                    if (selectedPart) {
                      setPart_no(selectedPart.Part_no);
                      setDefaultQty(selectedPart.Quantity);
                    } else {
                      setPart_no(''); 
                      setDefaultQty('');
                    }
                  }}
                  >
                <option value='' hidden>Select Part Name</option>
                {stockSparePart && stockSparePart.map((item) => (
                <option key={item.Part_no} value={item.Part_name}>
                  {item.Part_name}
                </option>
                ))}
                </select>
                
                <label htmlFor="Quantity" style={{padding: "10px"}}>Quantity : </label>
                <button onClick={decrementCount} className="btn-minus">-</button>&nbsp;
                    <input 
                      className="form-field"
                      style={{width : "10%", textAlign: 'center'}}
                        type="number"
                        value={Quantity}
                        onChange={(e)=>setQuantity(e.target.value)}
                        readOnly
                        >
                    </input>&nbsp;
                <button onClick={incrementCount} className="btn-plus">+</button>
                
              {/* </div> */}

            <br />

            {/* {Array.from({ length: selectCount }).map((_, index) => (
            <div style={{ marginLeft:"10%", marginRight:"10%"}}>
              <label htmlFor="PartName" style={{padding: "10px"}}>Part Name : </label>
              <select
              className="form-field-select"
              style={{width : "40%"}}
              value={Part_name}
              onChange={(e) => {
                setPart_name(e.target.value);
                const selectedPart = stockSparePart.find(item => item.Part_name === e.target.value);
                if (selectedPart) {
                  setPart_no(selectedPart.Part_no);
                  setDefaultQty(selectedPart.Quantity);
                } else {
                  setPart_no(''); 
                  setDefaultQty('');
                }
              }}
              >
              <option value='' >Select Part Name</option>
              {stockSparePart && stockSparePart.map((item) => (
              <option key={item.Part_no} value={item.Part_name}>
                {item.Part_name}
              </option>
              ))}
              </select>

              <label htmlFor="Quantity" style={{padding: "10px"}}>Quantity : </label>
              <button onClick={decrementCount} className="btn-minus">-</button>&nbsp;
                  <input 
                    className="form-field"
                    style={{width : "10%", textAlign: 'center'}}
                      type="number"
                      value={Quantity}
                      onChange={(e)=>setQuantity(e.target.value)}
                      readOnly
                      >
                  </input>&nbsp;
              <button onClick={incrementCount} className="btn-plus">+</button>
            </div>
    ))} */}

            <button type="button" className="btn-save" style={{marginTop:"10px", marginBottom:"10px", marginLeft:"33%"}} onClick={handleAddButtonClick}> เพิ่มรายการ </button>
            <button type="button" className="btn-cancel" style={{marginBottom:"10px"}} onClick={handleDelButtonClick}>ลบรายการ </button>

            <h2>รายการที่ต้องการเบิก</h2>
                {/* <ul>
                  {selectedLogs.map((item, index) => (
                    <li key={index}>
                        ชื่อ : {item.Part_name} | จำนวน : {item.Quantity}
                    </li>
                    ))}
                </ul> */}
                <table className="styled-table">
                  <thead>
                  <tr>
                      <td>Part Name</td>
                      <td>จำนวน</td>
                  </tr>
                  </thead>
                  <tbody>
                  {selectedLogs.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Part_name}</td>
                    <td>{item.Quantity}</td>
                  </tr>
                  ))}
                  </tbody>
                </table>
            </div><br />
            <button type="button" className="btn-save" onClick={onButtonWithdrawStock}>เบิกอะไหล่</button>
            <button type="button" className="btn-cancel" onClick={onButtonClose}>Cancel</button>
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

      <Snackbar open={openWithdrawSuccess} autoHideDuration={4000} onClose={() => setopenWithdrawSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
          <Alert onClose={() => setopenWithdrawSuccess(false)} severity="success">
            Withdraw Successfully!
          </Alert>
        </div>
      </Snackbar>

      <Snackbar open={openWithdrawError} autoHideDuration={4000} onClose={() => setopenWithdrawError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
          <Alert onClose={() => setopenWithdrawError(false)} severity="error">
            Withdraw Fail !
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
