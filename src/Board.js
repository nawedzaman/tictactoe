import React, { useState } from "react";
import Square from "./Square";
import Results from "./Results";
const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXturn] = useState(true);
  const [scores, setScores] = useState({
    x: 0,
    o: 0,
    tie: 0,
  });
  const handleReset = () => {
    setState(Array(9).fill(null));
  };
  const isDraw = !state.includes(null);
  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return false;
  };
  const isWinner = checkWinner();
  const handleClick = (index) => {
    if (isDraw) {
      handleReset();
      setScores((prevState) => ({ ...prevState, tie: prevState.tie + 1 }));
      return;
    }
    if (state[index] !== null) {
      return;
    }
    if (isWinner) {
      handleReset();
      isWinner === "X"
        ? setScores((prevState) => ({ ...prevState, x: prevState.x + 1 }))
        : setScores((prevState) => ({ ...prevState, o: prevState.o + 1 }));
      return;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXturn(!isXTurn);
  };
  return (
    <div className="board-container">
      {isWinner ? (
        <h4>{isWinner} has won</h4>
      ) : isDraw ? (
        <h4>Game is drawn</h4>
      ) : (
        <h4>Player {isXTurn ? "X" : "O"} move </h4>
      )}
      <div className="board-row">
        <Square onClick={() => handleClick(0)} value={state[0]} />
        <Square onClick={() => handleClick(1)} value={state[1]} />
        <Square onClick={() => handleClick(2)} value={state[2]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(3)} value={state[3]} />
        <Square onClick={() => handleClick(4)} value={state[4]} />
        <Square onClick={() => handleClick(5)} value={state[5]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(6)} value={state[6]} />
        <Square onClick={() => handleClick(7)} value={state[7]} />
        <Square onClick={() => handleClick(8)} value={state[8]} />
      </div>
      <div className="results">
        <Results score={scores} />
      </div>
    </div>
  );
};
export default Board;
