import React, { useState } from "react"
import axios from "axios";

export const Home = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onFormSubmit = (e) => {
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

    axios
      .post(url, fromData, config)
      .then((response) => {
        console.log('Image upload success')
        alert('Image upload success');

      })
      .catch((error) => {
        console.log("err", error);
        alert("Error:" + error);
      })
  }

  const onInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  }
  
  return(
      <div>
        <h2>Home Page</h2>

        {/* {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '300px', height: 'auto' }} />} */}

        {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ width: "300px", height: "auto" }}
        />
      )}


        <form onSubmit={onFormSubmit}>
          
          <input type="file" name="image" onChange={onInputChange} />
          <br></br>
          <button type="submit">Upload</button>
        </form>

        {/* <button className="link-btn" onClick={() => props.onFormSwitch('Layout')}>Layout</button> */}
        <button className="link-btn" onClick={() => props.onFormSwitch('Detail')}>เพิ่มข้อมูล</button>
      
      </div>
      
      
  )
}