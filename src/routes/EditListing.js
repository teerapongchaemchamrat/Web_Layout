import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditListing.css";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Popup from 'reactjs-popup';

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

    const [resourceId, setResourceId] = useState("");
    const [model, setModel] = useState("");
    const [dept, setDept] = useState("");
    const [location, setLocation] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const Removefunction = (no, dept, resource_id) => {
        if (window.confirm('Do you want to remove?')) {
            deleteData(no, dept, resource_id);
        }
    }
    
    const deleteData = async (no, dept, resource_id) => {
        try {
            await axios.delete(`http://192.168.10.76:8080/web/pointer/${no}`);
            await axios.delete(`http://192.168.10.76:8080/web/department/${dept}`);
            await axios.delete(`http://192.168.10.76:8080/web/resource/${resource_id}`);
            
            setOpenDeleteSuccess(true);
    
            // Update state to trigger a re-render
            const response = await fetch("http://192.168.10.76:8080/web/pointer/all");
            const resp = await response.json();
            editdatachange(resp);
    
        } catch (error) {
            console.error("Error Delete data:", error);
            setOpenDeleteError(true);
        }
    }

    const handleEdit = (item) => {
        setSelectedItem(item);
        setPopupOpen(true);
        setResourceId(item.resource_id);
        setDept(item.dept);
        setModel(item.model);
        setLocation(item.location);
      }
    
      const onButtonSubmit = async(e) => {
        e.preventDefault();
        if (!resourceId || !dept || !model || !location) {
            setOpenUpdateError(true);
            return;
          }
        try {
            const pointerDataUpdate = {
                no: selectedItem.no,
                resource_id: resourceId,
                dept: dept
              };
          
              const resourceDataUpdate = {
                resource_id: selectedItem.resource_id,
                resource_id_update: resourceId,
                model: model,
                location: location
              }
          
              const departmentDataUpdate = {
                dept: selectedItem.dept,
                dept_new: dept
              }
            // Update pointer data
            await axios.put(`http://192.168.10.76:8080/web/pointer/${selectedItem.no}`, pointerDataUpdate);

            // Update resource data
            await axios.put(`http://192.168.10.76:8080/web/resource/${selectedItem.resource_id}`, resourceDataUpdate);

            // Update department data
            await axios.put(`http://192.168.10.76:8080/web/department/${selectedItem.dept}`, departmentDataUpdate);

            setOpenUpdateSuccess(true);

            // Close the popup
            setPopupOpen(false);

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
        const searchFields = [item.resource_id]; // fix column filter
        return searchFields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
      })
    : [];

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
          <label for="search" className="label">Search</label>
          <input id="search" type="search" pattern=".*\S.*" className="input" autoComplete="off"  
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required/>
          <span className="caret"></span>
        </form>
        <button className="btn-back" onClick={() => buttonback()}>Back</button>
        </div>
        {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
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
            {/* {editdata &&
                editdata.map(item => (
                <tr key={item.no}>
                    <td>{item.no}</td>
                    <td>{item.resource_id}</td>
                    <td>{item.dept}</td>
                    <td>{item.location}</td>
                    <td>{item.model}</td>
                    <td>
                    <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => Removefunction(item.no, item.dept, item.resource_id)} className="btn-remove">Remove</button>
                    </td>
                </tr>
                ))
            } */}
            {filteredData.map(item => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td>{item.resource_id}</td>
              <td>{item.dept}</td>
              <td>{item.location}</td>
              <td>{item.model}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => Removefunction(item.no, item.dept, item.resource_id)} className="btn-remove">Remove</button>
              </td>
            </tr>
          ))}
            </tbody>
        </table>

      <Popup open={popupOpen} onClose={() => setPopupOpen(false)} 
        contentStyle={{
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"}}>
        <div >
          <h1 align="center">Edit Data</h1><br></br>
          <form >
            <div className="form-group">
              <label htmlFor="resource_id">Resource ID</label>
              <input
                className="form-field"
                type="text"
                name="resource"
                value={resourceId}
                onChange={(e) => setResourceId(e.target.value)}
                required
              />

              <label htmlFor="dept">Department</label>
              <input
                className="form-field"
                type="text"
                name="deparment"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                required 
              />

              <label htmlFor="modal">Model</label>
              <input
                className="form-field"
                type="text"
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required 
              />
            
              {/* <label htmlFor="location">Location</label>
              <input
                className="form-field"
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required 
              /> */}

              <label htmlFor="location">Location</label>
              <select
                className="form-field-select"
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
            </div>
            <button type="button" className="btn-save" onClick={onButtonSubmit}>Update</button>
            <button type="button" className="btn-cancel" onClick={() => setPopupOpen(false)}>Cancel</button>
          </form>
        </div>
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
