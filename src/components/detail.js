import React, { useState } from "react";
import axios from "axios";

export const Detail = (props) => {
    const [employeeID, setEmployeeID] = useState('');
    const [name, setName ] = useState('');
    const [position, setPosition ] = useState('');
    const [comID, setComID ] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSummit = async (e) =>{
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('EmpID', employeeID)
        formData.append('Name', name)
        formData.append('Position', position)
        formData.append('ComID', comID)
        formData.append('Email', email)
        formData.append('Status', status)

        const config = {
            headers : {
                'content-type' : 'application/json; charset=utf-8',
            },
        };

        const url = "http://192.168.10.76:8080/web/emp/add";

        axios
            .post(url, formData, config)
            .then((response) => {
                console.log(response)
                alert('Add data successfully')
            })
            .catch((error) => {
                console.log('Error: ' + error)
                alert('Error: ' + error)
            })
        
    }
    return(
        <div className="auth-form-container">
        <h2>Add Detail</h2>
        <form className="register-form" onSubmit={handleSummit}> 
            <label htmlFor="id">รหัสพนักงาน</label>
            <input value={employeeID} name="id" onChange={(e) => setEmployeeID(e.target.value)} id="id" placeholder="ID"/>

            <label htmlFor="name">ชื่อพนักงาน</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Name" />

            <label htmlFor="position">Position</label>
            <input value={position} name="position" onChange={(e) => setPosition(e.target.value)} id="position" placeholder="Position"/>

            <label htmlFor="comID">Computer ServiceTag</label>
            <input value={comID} name="comID" onChange={(e) => setComID(e.target.value)} id="comID" placeholder="ServiceTag"/>

            <label htmlFor="email">Email</label>
            <input value={email} name="email" onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="asd@chaiyoot.com"/>

            <label htmlFor="status">Status</label>
            <select value={status} name="status" onChange={(e) => setStatus(e.target.value)} id="status">
                <option value="Active">Active</option>
                <option value="De Active">DeActive</option>
            </select>

            <button type="submit">ADD DATA</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('Home')}>กลับหน้าหลัก</button>
        </div>
        
    )
}