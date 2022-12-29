import React from "react";
import resetIcon from "./reset.png";
import "../App.css";
const Reset = (props) => {
  return (
    <div onClick={props.onClick} className="button">
      <button>
        <img src={resetIcon} alt="reset" className="resetIcon" />
      </button>
    </div>
  );
};
export default Reset;
