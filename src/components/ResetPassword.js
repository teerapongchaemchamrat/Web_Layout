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

  export default function ResetPassword() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
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

      const resetPass = {
        username : username,
        password : password,
        updateby : getUser
      };
      
      try {
          setloading(true); 
          if (username.trim() !== '' && password.trim() !== '' ){
            await axios.put("http://XX.XX.XX.XX:XX/login/forget/password", resetPass);
            setUsername("");
            setPassword("");
            
            setOpenSuccess(true);
            setloading(false);
          }
          else {
            alert("กรุณากรอกข้อมูลให้ครบ");
            setloading(false); 
          }
      } catch (error) {
          console.error("Error register:", error);
          setOpenError(true);
          setUsername("");
          setPassword("");
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
              <h1>Reset Password</h1>
              <form>
                <label htmlFor="fullname">Username :</label>
                <input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text" />
                
                <label htmlFor="fullname">New Password :</label>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="Password"
                  autoComplete="new-password" />
                
                <input type="submit" value="SAVE" onClick={onSubmit} /> <br/><br/>
                <input type="reset" value="BACK" onClick={btnCancel} />
              </form>

              <Snackbar open={openSuccess} autoHideDuration={4000} onClose={() => setOpenSuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <div>
              <Alert onClose={() => setOpenSuccess(false)} severity="success">
                Reset Password Successfully!
              </Alert>
              </div>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={4000} onClose={() => setOpenError(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <div>
              <Alert onClose={() => setOpenError(false)} severity="error">
                Reset Password Fail ! 
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
