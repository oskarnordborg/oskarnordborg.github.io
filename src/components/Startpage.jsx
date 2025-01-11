import React from "react";
import "./Startpage.css";
import Countdown from "./Countdown";

function Startpage() {
  return (
    <div className="section">
      <Countdown />
      <h1>
        Save the date <br />
        Helårsrapporten <br />
        10e maj 2025
      </h1>
    </div>
  );
}

export default Startpage;
