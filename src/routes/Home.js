import React from "react";

function Home() {
  const getUsername = localStorage.getItem('Username');
  return (
    <div className="home">
      <h1 >WELLCOME ! <br /> {getUsername}</h1>
      
    </div>
    
  );
}

export default Home;
