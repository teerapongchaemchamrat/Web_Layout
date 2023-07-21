
import React, {useState} from "react";
//import logo from './logo.svg';
import './App.css';
import { Home } from './components/home';
import { Detail } from './components/detail';
//import { Layout } from './components/layout';

function App() {
    const [currentFrom, setCurrentFrom] = useState('Home');

    const toggleForm = (formName) => {
        setCurrentFrom(formName);
    }

    return(
        <div className="App">
            {
                currentFrom === "Home" ? <Home onFormSwitch={toggleForm}/> : <Detail onFormSwitch={toggleForm}/>
            }
        </div>
    );
}

export default App;
