import React from 'react'
import { BarLoader } from "react-spinners";
function Loader() {
  return (
    <div style={
        {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
        }
    }>     
      <BarLoader
        color="#6d96ed"
        cssOverride={{}}
        height={2.5}
        speedMultiplier={1}
        width={800}
      />
    </div>
  );
}

export default Loader