import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftPanel from "../LeftPanel/LeftPanel";
import Map from "../Map/MapContainer";

const Layout = () => {
  const navbarHeight = 90; // adjust according to your Navbar height

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar at the top */}
      <div style={{ height: navbarHeight }}>
        <Navbar />
      </div>

      {/* Main content */}
    <div
        style={{
          flex: 1,
          marginTop: 20,
          display:"flex",
          height:`calc(100vh - ${navbarHeight}px)`,
        }}
      >
        {/* Left Panel */}
        <div
        style={{
          flex: 1,
       
        
        }}
      >
        <LeftPanel /> 
      </div>

       <div
        style={{
          flex: 2, // twice as large as left/right
          backgroundColor: "#99ccff",
          
        }}
      >
       <Map />
      </div>

       <div
        style={{
          flex: 1,
          backgroundColor: "#cce5ff",
         
        }}
      >
        Right
      </div>

      </div>
    </div>
  );
};

export default Layout;
