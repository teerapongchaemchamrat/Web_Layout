
import React, {useState} from "react";
import './App.css';
//import { Home } from './components/home';
//import { Detail } from './components/detail';
//import { Layout } from './components/layout';
import axios from "axios";

function App() {
    // const [currentFrom, setCurrentFrom] = useState('Home');
    // const toggleForm = (formName) => {
    //     setCurrentFrom(formName);
    // }
    
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

    const onMouseOverCaptureHandler = () => {
        alert('Image 1 Alert!!!')
        
    };
    
    return(
        // <div className="App">
        //     {
        //         currentFrom === "Home" ? <Home onFormSwitch={toggleForm}/> : <Layout onFormSwitch={toggleForm}/>
        //     }
        // </div>
        <div className="container">

            {/* grid */}
            <div  className="grid1-1">
                <img src="image/image1.jpg" alt="computer" onMouseOverCapture={onMouseOverCaptureHandler}/>
            </div>

            <div  className="grid1-2">
                <img src="image/image2.jpg" alt="computer"/>
            </div>

            <div  className="grid1-3">
                <img src="image/image3.jpg" alt="computer"/>
            </div>

            <div  className="grid1-4">
                <img src="image/image4.jpg" alt="computer"/>
            </div>

            <div  className="grid1-5">
                <img src="image/image5.jpg" alt="computer"/>
            </div>

            <div  className="grid1-6">
                <img src="image/image6.jpg" alt="computer"/>
            </div>
            
        <br></br>
        <form onSubmit={onFormSubmit}>
            <input type="file"  onChange={onInputChange} />
            <button type="submit">Upload</button>
        </form>

        </div>
    );
}

export default App;
