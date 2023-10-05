import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom"; 
import "./EditListing.css";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function DataListing() {

    const [editdata, editdatachange] = useState(null);
    //const navigate = useNavigate();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    // const LoadDetail = (id) => {
    //     navigate("/employee/detail/" + id);
    // }
    // const LoadEdit = (id) => {
    //     navigate("/employee/edit/" + id);
    // }
    // const Removefunction = (no, dept, resource_id) => {
    
    //     if (window.confirm('Do you want to remove?')) {
    //         try {
    //         axios.delete(`http://192.168.10.76:8080/web/pointer/${no}`);
    //         axios.delete(`http://192.168.10.76:8080/web/department/${dept}`);
    //         axios.delete(`http://192.168.10.76:8080/web/resource/${resource_id}`);
            
    //         //alert("Delete successful");
    //         // setTimeout(function() {
    //         //     window.location.reload();
    //         //   }, 5000); 
    //         setOpenSuccess(true);

    //         const response = await fetch("http://192.168.10.76:8080/web/pointer/all");
    //         const resp = await response.json();
    //         editdatachange(resp);
            
    //         } catch (error){
    //             console.error("Error Delete data:", error);
    //             //alert("Error delete:", error);
    //             setOpenError(true);
    //         }
    //     }
    // }

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
            
            setOpenSuccess(true);
    
            // Update state to trigger a re-render
            const response = await fetch("http://192.168.10.76:8080/web/pointer/all");
            const resp = await response.json();
            editdatachange(resp);
    
        } catch (error) {
            console.error("Error Delete data:", error);
            setOpenError(true);
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
            
                <Snackbar open={openSuccess} autoHideDuration={4000} onClose={() => setOpenSuccess(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <div>
                        <Alert onClose={() => setOpenSuccess(false)} severity="error">
                        Delete Successfully!
                        </Alert>
                        </div>
                </Snackbar>

                    <Snackbar open={openError} autoHideDuration={4000} onClose={() => setOpenError(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <div>
                        <Alert onClose={() => setOpenError(false)} severity="error">
                        Delete Fail !
                        </Alert>
                        </div>
                </Snackbar>
        </div>
    );
}
