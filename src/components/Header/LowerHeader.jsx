import React from "react";
//npm install react-icons --save, then go to https://react-icons.github.io/react-icons/
import { AiOutlineMenu } from "react-icons/ai";  
import classes from "./Header.module.css"
function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}
export default LowerHeader;
