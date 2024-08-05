import React, { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { IconContext } from "react-icons";
import axios from "axios";
import Popup from 'reactjs-popup';

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  //const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [forceRerender, setForceRerender] = useState(false);
  const [popupAddLocation, setpopupAddLocation] = useState(false);
  const [popupSelectManageUser , setPopupSelectManageUser] = useState(false);
  const [paramsLocation, setparamsLocation] = useState("");

  const showSidebar = () => {
    setSidebar(!sidebar);
    setForceRerender(!forceRerender);
  };
  
  const valueRole = localStorage.getItem('RoleType');

  const navigate = useNavigate();

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchDataAndUpdateState = async () => {
    try {
      const response = await axios.get("http://XX.XX.XX.XX:XX/web/location", { timeout: 1000 });
      const data = response.data;
      const uniqueLocations = [...new Set(data.map((item) => item.Uf_asset_Location))];
      const locationValues = [];
      uniqueLocations.forEach((location, index) => {
        locationValues[location] = index + 1;
      });

      if (isMounted.current) {
        setLocations(uniqueLocations.map((location) => ({
          name: location,
          value: locationValues[location],
        })));
      }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceRerender]);

  
  const PageEdit = () => {
      navigate("/edit");
  };

  const PageLogin = () => {
    navigate("/");
  };

  const PageCustom = () => {
    navigate("/layout/custom")
  }

  const PageNewUser = () => {
    //window.open("user/newuser", "_blank"); // open new tab
    navigate("user/newuser");
    setPopupSelectManageUser(false);
  };

  const PageResetPassword = () => {
    //window.open("user/reset/password", "_blank");
    navigate("user/reset/password");
    setPopupSelectManageUser(false);
  };

  const PageUpdateRoleUser = () => {
    //window.open("user/role", "_blank");
    navigate("user/role");
    setPopupSelectManageUser(false);
  };

  const AddLocation = async(e) => {
    e.preventDefault();

    const locationControll = {
      values_select : "",
      Uf_asset_Location : paramsLocation
    };
    try{
      //console.log('paramsLocation:', JSON.stringify(values_select));

        if(paramsLocation !== ""){

            const maxIndexValue = Math.max(...locations.map(location => location.value), 0) + 1;
            locationControll.values_select = maxIndexValue.toString();

            await axios.post("http://XX.XX.XX.XX:XX/web/location/add", locationControll);
            alert("Add successful");
            console.log('locationControll :', JSON.stringify(locationControll, null, 2));
            setpopupAddLocation(false);
            //window.location.reload();
      } else { 
        alert("Please enter data !");
      }
    } catch (error) {
        console.error("Add location filed :", error);
    }
    setparamsLocation("");
  };

  const handleLocationClick = (location) => {
    //setSelectedLocation(location.value);
    console.log('Values_select: ' , location.value);
    localStorage.setItem('Values_select', location.value);
    localStorage.setItem('Location_select', location.name);
    navigate("/layout");
    window.location.reload();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> 
          {(valueRole === 'Administrator' || valueRole ==='SuperAdministrator') && (
            <button className="button-81-pushable" onClick={() => PageEdit()}>
              <span className="button-81-shadow"></span>
              <span className="button-81-edge"></span>
              <span className="button-81-front text">
              Edit&nbsp;Data
              </span>
            </button>
          )}
            
          <div className="menu-bars-text">
              CHAIYOOT FACTORY
          </div>

          {(valueRole === 'SuperAdministrator') && (
          <div className="menu-bars-newuser">
          <button className="button-81-pushable" onClick={() => setPopupSelectManageUser(true)}>
            <span className="button-81-shadow"></span>
            <span className="button-81-edge"></span>
            <span className="button-81-front text">
              Manage&nbsp;User
            </span>
          </button>
          </div>
          )}

          {(valueRole === 'Administrator' || valueRole ==='SuperAdministrator') && (
          <div className="menu-bars-newuser">
          <button className="button-81-pushable" onClick={() => PageCustom(true)}>
            <span className="button-81-shadow"></span>
            <span className="button-81-edge"></span>
            <span className="button-81-front text">
              Move image
            </span>
          </button>
          </div>
          )}

          <div className="menu-bars-logout">
          <button className="button-82-pushable" onClick={() => PageLogin()}>
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">
              Log&nbsp;Out
            </span>
          </button>
          </div>
           
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {locations.map((location, index) => {
              return (
                <li key={index} className='nav-text' onClick={() => handleLocationClick(location)}>
                  <Link to="#">
                  <span>{location.name}</span>
                  </Link>
                </li>
              );
            })}
            {(valueRole === 'Administrator' || valueRole === 'SuperAdministrator') && (
                <button className="btn-save" onClick={() => setpopupAddLocation(true)}>Add</button>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
      <Popup open={popupAddLocation} onClose={() => setpopupAddLocation(false)} 
        contentStyle={{
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
        <div>
          <h1 align="center">Add New Location</h1>
          
            <div className="form-group" style={{maxHeight: '768px', overflowY: 'auto'}}>
            <label htmlFor="Part No">Location Name : </label>
            <input
              className="form-field"
              type="text"
              name="Part_no"
              maxLength={30}
              onChange={(e) => setparamsLocation(e.target.value)}
              required 
            /> <br />

            </div>
            <button type="button" className="btn-save" onClick={AddLocation}>ADD</button>
            <button type="button" className="btn-cancel" onClick={() => setpopupAddLocation(false)}>Cancel</button>  
        </div>
      </Popup>

      <Popup open={popupSelectManageUser} onClose={() => setPopupSelectManageUser(false)} 
        contentStyle={{
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            alignitems: "center",
            justifycontent: "center"
            }}>
        <div className="popup-manage-user">
          <h1 align="center">Select Function</h1><br/><br/>
          <div className="button-container">
            <button type="button" className="btn-manage-user" onClick={PageNewUser} >Create User</button>
            <button type="button" className="btn-manage-user" onClick={PageResetPassword}>Forgot password</button>
            <button type="button" className="btn-manage-user" onClick={PageUpdateRoleUser}>Update role</button> <br/><br/>
          </div> <br/><br/>
          <button type="button" className="btn-cancel-user" onClick={() => setPopupSelectManageUser(false)}>Cancel</button>  
          
        </div>
      </Popup>
    </>
  );
}
