import React, { useState } from 'react';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  export default function NewUser() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [fullname, setFullname] = useState('');
    const [role, setRole] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();
    const getUser = localStorage.getItem('Username')
    
    const btnCancel = () => {
      navigate('/home');
    };

    const onSubmit = async(e) => {
      e.preventDefault();

      const regUser = {
        username : username,
        password : password,
        fullname : fullname,
        role : role,
        createby : getUser
      };
      
      try {
          setloading(true); 
          if(password === confirm_password){
              if (username.trim() !== '' && password.trim() !== '' && fullname.trim() !== '' && role.trim() !== ''){
                await axios.post("http://XX.XX.XX.XX:XX/login/register", regUser);
                setUsername("");
                setPassword("");
                setConfirm_password("");
                setFullname("");
                setOpenSuccess(true);
                setloading(false);
              }
              else {
                alert("กรุณากรอกข้อมูลให้ครบ");
                setloading(false); 
              }
          } else {
            alert("Password not match \nกรุณาตรวจสอบ Password");
            setloading(false);
          }
      } catch (error) {
          console.error("Error register:", error);
          setOpenError(true);
          setUsername("");
          setPassword("");
          setConfirm_password("");
          setFullname("");
          setloading(false);
      };
    };

    return (
      <div>
          <section className='section'>
            <div className='air air1'></div>
            <div className='air air2'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>
          
            <div id="login-form">
              <h1>Create User</h1>
              <form>
                <label htmlFor="fullname">Username :</label>
                <input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text" />
                
                <label htmlFor="fullname">Password :</label>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="Password"
                  autoComplete="new-password"
                ></input>
                
                <label htmlFor="fullname">Confirm Password :</label>
                <input 
                  value={confirm_password}
                  onChange={(e) => setConfirm_password(e.target.value)}
                  type="Password"
                  autoComplete="confirm-password"
                />
                
                <label htmlFor="fullname">Full Name :</label>
                <input 
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  type="text" />
                
                
                <label htmlFor="role">Role :</label>
              
                <select id="roles" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="" disabled hidden>Choose Role</option>
                  <option value="SuperAdministrator">Super Administrator</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Production">Production</option>
                  <option value="User">User</option>
                </select>
                
                     
                <input type="submit" value="REGISTER" onClick={onSubmit} /> <br/><br/>
                <input type="reset" value="BACK" onClick={btnCancel} />
              </form>

              <Snackbar open={openSuccess} autoHideDuration={4000} onClose={() => setOpenSuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <div>
              <Alert onClose={() => setOpenSuccess(false)} severity="success">
                Create User Successfully!
              </Alert>
              </div>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={4000} onClose={() => setOpenError(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <div>
              <Alert onClose={() => setOpenError(false)} severity="error">
                Username already exists.
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
          </section>
      </div>
    );
  }
