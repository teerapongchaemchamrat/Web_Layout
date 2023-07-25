import './Office_floor_1.css'
import React, { useState } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import DataFetchingAPI from './DataFetchingAPI';

function Office_floor_1() {

  const [file, setFile] = useState(null);
    
    const onFormSubmit = (e) =>{
        e.preventDefault();

        const fromData = new FormData();
        fromData.append('ImageName', file.name)
        fromData.append('image', file)
        const config = {
            headers : {
                'content-type' : 'multipart/form-data',
            },
        };

        const url = "http://192.168.10.76:8080/web/upload";

        axios.post(url, fromData, config)
            .then((response) => {
                console.log('Image upload successfully:');
                alert('Image upload successfully');
            })
            .catch((error) => {
                console.log('Error: ', error);
                alert("Error: " + error);
            })
    }

    const onInputChange = (e) => {
        setFile(e.target.files[0]);
    };

  return (
    // <div className="office_floor_1">
    //   <h1>OFFICE FLOOR 1</h1>
    // </div>
    <div className="container">

            {/* grid */}
            <Popup trigger=
                {<div className="grid1-1">
                    <img src="image/image1.jpg" alt="image1.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={1} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid2-1">
                    <img src="image/image2.jpg" alt="image2.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={2} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid3-7">
                    <img src="image/image3.jpg" alt="image3.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={3} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid3-8">
                    <img src="image/image4.jpg" alt="image4.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={4} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid3-9">
                    <img src="image/image5.jpg" alt="image5.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={5} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid3-10">
                    <img src="image/image6.jpg" alt="image6.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={6} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid5-2">
                    <img src="image/image7.jpg" alt="image7.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={7} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid5-3">
                    <img src="image/image8.jpg" alt="image8.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={8} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
            
            <Popup trigger=
                {<div className="grid5-4">
                    <img src="image/image9.jpg" alt="image9.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={9} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid5-5">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid5-6">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid5-8">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid5-9">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid5-10">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid6-2">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid6-3">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid6-4">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid6-5">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid6-6">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid6-8">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid6-9">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid6-10">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid8-2">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid8-3">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid8-4">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid8-5">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid8-6">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid8-7">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid8-8">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid9-2">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid9-3">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid9-4">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid9-5">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid9-6">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid9-7">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid9-8">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid11-7">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <Popup trigger=
                {<div className="grid11-8">
                    <img src="image/image10.jpg" alt="image10.jpg" />
                </div>
                }
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DataFetchingAPI id={10} />
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        
            <div className="upload" >
                <form onSubmit={onFormSubmit} >
                    <input type="file"  onChange={onInputChange} />
                    <br></br>
                    <button type="submit" className="button">Upload</button>
                </form>
            </div>
        </div>
  );
}

export default Office_floor_1;
