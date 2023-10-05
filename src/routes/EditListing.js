import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom"; 
import "./EditListing.css";
import axios from "axios";
export default function DataListing() {

    const [editdata, editdatachange] = useState(null);
    //const navigate = useNavigate();

    // const LoadDetail = (id) => {
    //     navigate("/employee/detail/" + id);
    // }
    // const LoadEdit = (id) => {
    //     navigate("/employee/edit/" + id);
    // }
    const Removefunction = (no, dept, resource_id) => {
    
        if (window.confirm('Do you want to remove?')) {
            try {
            axios.delete(`http://192.168.10.76:8080/web/pointer/${no}`);
            axios.delete(`http://192.168.10.76:8080/web/department/${dept}`);
            axios.delete(`http://192.168.10.76:8080/web/resource/${resource_id}`);
            
            alert("Delete successful");
            window.location.reload(); 
            
            } catch (error){
                console.error("Error Delete data:", error);
                alert("Error delete:", error);
            }
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

    return(
        <div>
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
                        {editdata &&
                            editdata.map(item => (
                                <tr key={item.no}>
                                    <td>{item.no}</td>
                                    <td>{item.resource_id}</td>
                                    <td>{item.dept}</td>
                                    <td>{item.location}</td>
                                    <td>{item.model}</td>
                                    <td>
                                        <button className="btn-edit">Edit</button>
                                        <button onClick={() => Removefunction(item.no, item.dept, item.resource_id)} className="btn-remove">Remove</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    );
}
