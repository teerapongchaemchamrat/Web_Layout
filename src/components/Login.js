import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();

        const userData = {
            Username: username,
            WorkstationLogin: password
        }
         
        try {
                const response = await axios.post("http://49.0.65.4:3002/login", userData);
                console.log("POST Response:", response.data);
                setOpenSuccess(true);
                if ( username === 'admin') {    //   เครื่องหมายหรือ ||
                    localStorage.setItem('RoleType', 'administrator');
                    navigate('/home', {state:{valueUser: username}});
                } else {
                    localStorage.setItem('RoleType', 'user');
                    navigate('/home', {state:{valueUser: username}});
                }  
            } catch (error) {
                console.error("Error login data:", error);
                setOpenError(true);
                setPassword("");
            }
    }

  return (
    <div id="login-form">
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input 
            type="text" 
            id="username" 
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="LOGIN" onClick={onSubmit}/>
      </form>
      <Snackbar open={openSuccess} autoHideDuration={4000} onClose={() => setOpenSuccess(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
        <Alert onClose={() => setOpenSuccess(false)} severity="success">
          Login Successfully! {username}
        </Alert>
        </div>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={4000} onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <div>
        <Alert onClose={() => setOpenError(false)} severity="error">
          Username or Password incorrect
        </Alert>
        </div>
      </Snackbar>
    </div>
  );
}
