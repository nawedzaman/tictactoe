import React from "react";
import "./App.css";
const Results = (props) => {
  return (
    <div className="scores">
      <div className="playerNames">
        <span>Player X</span>
        <br />
        <span className="scoreValues">{props.score.x}</span>
      </div>
      <div className="playerNames">
        <span>Game Drawn</span>
        <br />
        <span className="scoreValues">{props.score.tie}</span>
      </div>
      <div className="playerNames">
        <span>Player O</span>
        <br />
        <span className="scoreValues">{props.score.o}</span>
      </div>
    </div>
  );
};
export default Results;
