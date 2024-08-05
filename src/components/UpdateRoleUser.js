import React, { useState, useEffect } from 'react';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  export default function UpdateRoleUser() {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [loading, setloading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const getUser = localStorage.getItem('Username')
    
    const btnCancel = () => {
      navigate('/home');
    };

    const onSubmit = async(e) => {
      e.preventDefault();

      const NewRole = {
        username : username,
        role : role,
        updateby : getUser
      };
      
      try {
          setloading(true); 

          const userListResponse = await axios.get("http://XX.XX.XX.XX:XX/login/list/user");
          const userList = userListResponse.data;
          // Check if the username exists in the user list
          const normalizedUsername = username.trim().toLowerCase();
          const userExists = userList.includes(normalizedUsername);
          console.log(userList); 
          
          if (username.trim() !== '' && role.trim() !== '') {
            if (userExists) {
                // User found, proceed with role update
                await axios.put("http://XX.XX.XX.XX:XX/login/role/update", NewRole);
                setUsername("");
                setOpenSuccess(true);
                setloading(false);
            } else {
                // User not found, show alert
                alert("User not found!");
                setloading(false);
            }
        } else {
            alert("กรุณากรอกข้อมูลให้ครบ");
            setloading(false);
        }

      } catch (error) {
          console.error("Error register:", error);
          setOpenError(true);
          setUsername("");
          setloading(false);
      };
    };

  useEffect(() => {
      const fetchUserList = async () => {
          try {
              const response = await axios.get("http://XX.XX.XX.XX:XX/login/list/user");
              setUserList(response.data);
          } catch (error) {
              console.error("Error fetching user list:", error);
          }
      };

      fetchUserList();
  }, []);

  useEffect(() => {
    const normalizedUsername = username.trim().toLowerCase();
    const filteredUsers = userList.filter(user => user.toLowerCase().includes(normalizedUsername));
    setFilteredUserList(filteredUsers);
  }, [username, userList]);

  const handleInputChange = (e) => {
    const inputUsername = e.target.value;
    setUsername(inputUsername);
    setShowDropdown(inputUsername.trim().length > 0);
  };

  const handleUserSelect = (selectedUser) => {
    setUsername(selectedUser);
    setShowDropdown(false);
  };

    return (
      <div>
          <section className='section'>
            <div className='air air1'></div>
            <div className='air air2'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>
          
            <div id="login-form">
              <h1>Update Role</h1>
              <form>
                  <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        value={username}
                        onChange={handleInputChange}
                        type="text"
                        id="username"
                    />
        
                    {/* Dropdown list for user selection */}
                    {showDropdown && (
                        <div style={{ border: "1px solid #ccc", marginTop: "-20px", maxHeight: "150px", overflowY: "auto", borderRadius: "10px" }}>
                            {filteredUserList.map(user => (
                                <div 
                                    key={user} 
                                    style={{ padding: "5px", cursor: "pointer", color: "gray" }} 
                                    onClick={() => handleUserSelect(user)}
                                >
                                    {user}
                                </div>
                            ))}
                        </div>
                    )}
                  </div>
          
                <label htmlFor="role">Role :</label>
                <select id="roles" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="" disabled hidden>Choose Role</option>
                  <option value="SuperAdministrator">Super Administrator</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Production">Production</option>
                  <option value="User">User</option>
                </select>
                            
                <input type="submit" value="SAVE" onClick={onSubmit} /> <br/><br/>
                <input type="reset" value="BACK" onClick={btnCancel} />
              </form>

              <Snackbar open={openSuccess} autoHideDuration={4000} onClose={() => setOpenSuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <div>
              <Alert onClose={() => setOpenSuccess(false)} severity="success">
                Update Role Successfully!
              </Alert>
              </div>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={4000} onClose={() => setOpenError(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <div>
              <Alert onClose={() => setOpenError(false)} severity="error">
                Update Role Fail !
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
