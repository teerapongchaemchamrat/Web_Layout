import React from "react";

function Home() {
  const getUsername = localStorage.getItem('Username');
  return (
    <div className="home">
      <h1>WELLCOME !<br/></h1>
      <h3>{getUsername}</h3>
    </div>
    
  );
}

export default Home;
