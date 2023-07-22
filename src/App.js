
import React, {useState} from "react";
//import logo from './logo.svg';
import './App.css';
//import { Home } from './components/home';
//import { Detail } from './components/detail';
//import { Layout } from './components/layout';

function App() {
    // const [currentFrom, setCurrentFrom] = useState('Home');
    // const toggleForm = (formName) => {
    //     setCurrentFrom(formName);
    // }
    const [uploadedImages, setUploadedImages] = useState(Array(10).fill(null));

    const handleImageUpload = (event, index) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUploadedImages(prevImages => {
              const newImages = [...prevImages];
              newImages[index] = reader.result;
              return newImages;
            });
          };
          reader.readAsDataURL(file);
        }
      };

    return(
        // <div className="App">
        //     {
        //         currentFrom === "Home" ? <Home onFormSwitch={toggleForm}/> : <Layout onFormSwitch={toggleForm}/>
        //     }
        // </div>
        <div className="container">

            {/* grid1-1 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}

            {/* grid1-2 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}

            {/* grid1-3 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}

            {/* grid1-4 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}

            {/* grid1-5 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}

            {/* grid2-1 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}

            {/* grid2-2 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}

            {/* grid2-3 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}

            {/* grid2-4 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}

            {/* grid2-5 */}
            {uploadedImages.map((imageData, index) => (
        <div key={index} className={`grid${Math.floor(index / 5) + 1}-${(index % 5) + 1}`}>
          {imageData ? (
            <img src={imageData} alt={`Uploaded ${index}`} />
          ) : (
            <input type="file" onChange={(e) => handleImageUpload(e, index)} />
          )}
        </div>
      ))}
        </div>
    );
}

export default App;
