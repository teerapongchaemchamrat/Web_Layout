import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./EditListing.css";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default function SparePart() {

    const getUsername = localStorage.getItem('Username');

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [popupAdd, setPopupAdd] = useState(false);
    const [popupAddNew, setPopupAddNew] = useState(false);
    let [count, setCount] = useState(1); 
    const [openAddSuccess, setopenAddSuccess] = useState(false);
    const [openAddError, setopenAddError] = useState(false);
    const [loading, setloading] = useState(false);

    const [stockSparePart, setstockSparePart] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const [Part_no , setPart_no] = useState("");
    const [Part_name, setPart_name] = useState("");
    const [Quantity, setQuantity] = useState("");

    useEffect(() => {
        setloading(true);
        fetch("http://192.168.10.27:5000/web/sparepart/all").then((res) => {
            return res.json();
        }).then((resp) => {
            setstockSparePart(resp);
            setloading(false);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    //console.log('data:', JSON.stringify(stockSparePart, null, 2));
    const handleAdd = (item) => {
        setSelectedItem(item);
        setPopupAdd(true);
        setPart_no(item.Part_no);
        setPart_name(item.Part_name);
        setQuantity(item.Quantity);
    };

    const filteredData = stockSparePart
    ? stockSparePart.filter(item => {
        const searchFields = [item.Part_no]; // fix column filter
        return searchFields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
      })
    : [];

    function incrementCount() {
        if (count === '' || count < 10){
            count = count + 1;
            setCount(count);
        }
    };
    function decrementCount() {
        if (count === '' || count > 1){
            count = count - 1;
            setCount(count);
        }
    };

    const onButtonAddStock = async(e) => {
        e.preventDefault();
        try{
            setloading(true);
            const dataAddStock = {
                Part_no : selectedItem.Part_no,
                Add_Quantity : count
            };

            const logData = {
              Uf_asset_RESID : null,
              Part_no : selectedItem.Part_no,
              Part_name : selectedItem.Part_name,
              Quantity : count,
              Note : null,
              Type : 'AddStock',
              update_by : getUsername
            };

            await axios.put(`http://192.168.10.27:5000/web/sparepart/add/stock/${selectedItem.Part_no}`, dataAddStock);
            await axios.post(`http://192.168.10.27:5000/web/log/add`, logData);
            setPopupAdd(false);
            setopenAddSuccess(true);
            setCount(1);
            
            const response = await fetch("http://192.168.10.27:5000/web/sparepart/all");
            const resp = await response.json();
            setstockSparePart(resp);
            setloading(false);
        }catch (error){
            setopenAddError(true);
            console.log("Error add stock: ", error);
        }
    };

    const onButtonCancel = () => {
      setPopupAdd(false)
      setCount(1);
    };

    const onButtonAddNewStock = async(e) => {
        e.preventDefault();
        try{
            setloading(true);
            const dataAddNewStock = {
                Part_no : Part_no,
                Part_name : Part_name,
                Quantity : Quantity
            };

            const logData = {
              Uf_asset_RESID : null,
              Part_no : Part_no,
              Part_name : Part_name,
              Quantity : Quantity,
              Note : null,
              Type : 'AddStock',
              update_by : getUsername
            };

            await axios.post(`http://192.168.10.27:5000/web/sparepart/add`, dataAddNewStock);
            await axios.post(`http://192.168.10.27:5000/web/log/add`, logData);
            setPopupAddNew(false);
            setopenAddSuccess(true);

            const response = await fetch("http://192.168.10.27:5000/web/sparepart/all");
            const resp = await response.json();
            setstockSparePart(resp);
            setloading(false);
        }catch (error){
            setopenAddError(true);
            console.log("Error add stock: ", error);
        }
    };

  return (
    <div>
        <section>
            <div className="content-text">
                <h2>Stock Spare Part</h2>
                <h2>Stock Spare Part</h2>
            </div>
        </section>
        
        <div className="btn-filter">
        <form className="form">
          <label >Part No. : </label>
          <label htmlFor="search" className="label">Search</label>
          <input id="search" type="search" pattern=".*\S.*" className="input" autoComplete="off"  
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required/>
          <span className="caret"></span>
        </form>
        <button className="btn-add-new-stock" onClick={() => setPopupAddNew(true)}>Add New</button>
        <button className="btn-back" onClick={() => navigate('/edit')}>Back</button>
        </div>
        <table className="styled-table">
            <thead>
            <tr>
                <td>Part No.</td>
                <td>Part Name</td>
                <td>Quantity</td>
                <td>Action</td>
            </tr>
            </thead>
            <tbody>
            {filteredData.map(item => (
                <tr key={item.Part_no} 
                    style={{ backgroundColor: item.Quantity <= 2 ? "#FF0000" : "" }}>
                    <td>{item.Part_no}</td>
                    <td>{item.Part_name}</td>
                    <td>{item.Quantity}</td>
                    <td>
                        <button className="btn-stat" onClick={() => handleAdd(item)} >Add</button>
                    </td>
                </tr>
             ))}
            </tbody>
        </table>

        <Popup open={popupAdd} onClose={() => setPopupAdd(false)} 
        contentStyle={{
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
        <div>
          <h1 align="center" style={{fontSize: "30px"}}>Add Stock</h1><br /><br />
          
            <div style={{display:"block", marginLeft:"10%", marginRight:"10%"}}>
              <div style={{textAlign: "center", fontSize: "20px"}}>
                <label htmlFor="Part No">Part No : {Part_no}</label> <br /><br />
                <label htmlFor="Part Name">Part Name : {Part_name}</label><br /><br />
                <label htmlFor="Quantity" align="center">จำนวนปัจจุบัน : {Quantity} </label><br /><br />
      
                <label htmlFor="Quantity">จำนวนที่ต้องการเพิ่ม : &nbsp;&nbsp;</label>
                    <button className="btn-minus" onClick={decrementCount}>-</button>&nbsp;
                    <input 
                        className="form-field"
                        style={{width : "10%", textAlign: 'center'}}
                        type="number"
                        value={count}
                        onChange={(e)=>setCount(e.target.value)}
                        readOnly
                        >
                    </input>&nbsp;
                    <button className="btn-plus" onClick={incrementCount}>+</button>
                </div>
            </div><br /><br />
            <div style={{marginLeft:"4%"}}>
            <button type="button" className="btn-save" onClick={onButtonAddStock}>ADD</button>
            <button type="button" className="btn-cancel" onClick={onButtonCancel}>Cancel</button>
            </div>
        </div>
      </Popup>

      <Popup open={popupAddNew} onClose={() => setPopupAddNew(false)} 
        contentStyle={{
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            
            }}>
        <div>
          <h1 align="center">Add New Stock</h1>
          
            <div className="form-group" style={{maxHeight: '768px', overflowY: 'auto'}}>

            <label htmlFor="Part No">Part No. : </label>
            <input
              className="form-field"
              type="text"
              name="Part_no"
              maxLength={30}
              onChange={(e) => setPart_no(e.target.value)}
              required 
            /> <br />

            <label htmlFor="Part Name">Part Name : </label>
            <input
              className="form-field"
              type="text"
              name="Part_name"
              maxLength={100}
              onChange={(e) => setPart_name(e.target.value)}
              required 
            /> <br />

            <label htmlFor="Quantity">Quantity : </label>
            <input
              className="form-field"
              type="number"
              name="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              required 
            /> <br />
            </div>
            <button type="button" className="btn-save" onClick={onButtonAddNewStock}>ADD</button>
            <button type="button" className="btn-cancel" onClick={() => setPopupAddNew(false)}>Cancel</button>
          
        </div>
      </Popup>

      <Snackbar open={openAddSuccess} autoHideDuration={4000} onClose={() => setopenAddSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
          <Alert onClose={() => setopenAddSuccess(false)} severity="success">
            Add Stock Successfully!
          </Alert>
        </div>
      </Snackbar>

      <Snackbar open={openAddError} autoHideDuration={4000} onClose={() => setopenAddError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
          <Alert onClose={() => setopenAddError(false)} severity="error">
            Add Stock Fail !
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

