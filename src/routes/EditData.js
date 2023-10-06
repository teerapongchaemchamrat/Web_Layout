import React, { useState, useEffect } from "react";
import "./EditData.css";


function EditData() {

    const [resourceId, setResourceId] = useState("");
    const [model, setModel] = useState("");
    const [dept, setDept] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        // Assuming you have an API endpoint to fetch the data
        fetch("http://192.168.10.76:8080/web/pointer/all")
            .then(response => response.json())
            .then(data => {
                setResourceId(data.resourceId);
                setModel(data.model);
                setDept(data.dept);
                setLocation(data.location);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can do something with the formData here, like sending it to a server
        
    };

    return(
        <div className="edit-data-container">
            <h2 align="center ">Update Data</h2><br></br>
            <form >
                <div className="form-group">
                    <label htmlFor="resource_id">Resource ID</label>
                    <input
                        type="text"
                        id="resource_id"
                        name="resource_id"
                        value={resourceId}
                        onChange={(e) => setResourceId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="dept">Department</label>
                    <input
                        type="text"
                        id="dept"
                        name="dept"
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button"onClick={handleSubmit}>
                    Submit</button>
            </form>
        </div>
    );
    
}


export default EditData;