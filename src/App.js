
import React, {useState} from "react";
import './App.css';
import { Home } from './components/home';
//import { Detail } from './components/detail';
import { Layout } from './components/layout';
//import axios from "axios";
//import Popup from 'reactjs-popup';
//import DataFetchingComponent from './components/DataFetchingComponent';


function App() {
    const [currentFrom, setCurrentFrom] = useState('Home');
    const toggleForm = (formName) => {
        setCurrentFrom(formName);
    }
    
    // const [file, setFile] = useState(null);
    
    // const onFormSubmit = (e) =>{
    //     e.preventDefault();

    //     const fromData = new FormData();
    //     fromData.append('ImageName', file.name)
    //     fromData.append('image', file)
    //     const config = {
    //         headers : {
    //             'content-type' : 'multipart/form-data',
    //         },
    //     };

    //     const url = "http://192.168.10.76:8080/web/upload";

    //     axios.post(url, fromData, config)
    //         .then((response) => {
    //             console.log('Image upload successfully:');
    //             alert('Image upload successfully');
    //         })
    //         .catch((error) => {
    //             console.log('Error: ', error);
    //             alert("Error: " + error);
    //         })
    // }

    // const onInputChange = (e) => {
    //     setFile(e.target.files[0]);
    // };

    // const onMouseOverHandler = () => {
    //     alert('Image 1 Alert!!!')
        
    // };

        
    return(
        <div className="App">
            {
                currentFrom === "Home" ? <Home onFormSwitch={toggleForm}/> : <Layout onFormSwitch={toggleForm}/>
            }
        </div>
        // <div className="container">

        //     {/* grid */}
        //     <Popup trigger=
        //         {<div className="grid1-1">
        //             <img src="image/image1.jpg" alt="image1.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={1} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid2-1">
        //             <img src="image/image2.jpg" alt="image2.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={2} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid3-7">
        //             <img src="image/image3.jpg" alt="image3.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={3} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid3-8">
        //             <img src="image/image4.jpg" alt="image4.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={4} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid3-9">
        //             <img src="image/image5.jpg" alt="image5.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={5} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid3-10">
        //             <img src="image/image6.jpg" alt="image6.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={6} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid5-2">
        //             <img src="image/image7.jpg" alt="image7.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={7} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid5-3">
        //             <img src="image/image8.jpg" alt="image8.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={8} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>
            
        //     <Popup trigger=
        //         {<div className="grid5-4">
        //             <img src="image/image9.jpg" alt="image9.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={9} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid5-5">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid5-6">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid5-8">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid5-9">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid5-10">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid6-2">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid6-3">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid6-4">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid6-5">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid6-6">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid6-8">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid6-9">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid6-10">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid8-2">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid8-3">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid8-4">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid8-5">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid8-6">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid8-7">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid8-8">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid9-2">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid9-3">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid9-4">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid9-5">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid9-6">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid9-7">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid9-8">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid11-7">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>

        //     <Popup trigger=
        //         {<div className="grid11-8">
        //             <img src="image/image10.jpg" alt="image10.jpg" />
        //         </div>
        //         }
        //         modal nested>
        //         {
        //             close => (
        //                 <div className='modal'>
        //                     <div className='content'>
        //                     <DataFetchingComponent id={10} />
        //                     </div>
        //                     <div>
        //                         <button onClick=
        //                             {() => close()}>
        //                                 Close
        //                         </button>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Popup>
        
        //     <div className="upload" >
        //         <form onSubmit={onFormSubmit} >
        //             <input type="file"  onChange={onInputChange} />
        //             <br></br>
        //             <button type="submit" className="button">Upload</button>
        //         </form>
        //     </div>
            
        // </div>
        
    );
}

export default App;
