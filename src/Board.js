import React, { useState, useEffect } from "react";
import Square from "./Square";
import Results from "./Results";

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, tie: 0 });
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);

  const handleReset = () => {
    setBoard(Array(9).fill(null));
  };
  const handleResetScores = () => {
    setBoard(Array(9).fill(null));
    setScores({ x: 0, o: 0, tie: 0 });
  };

  const checkWinner = (board) => {
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
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (!board.includes(null)) {
      return "tie";
    }

    return false;
  };

  const minimax = (board, depth, maximizingPlayer) => {
    const winner = checkWinner(board);
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (winner === "tie") return 0;

    if (maximizingPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          let newBoard = [...board];
          newBoard[i] = "O";
          const score = minimax(newBoard, depth + 1, false);
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          let newBoard = [...board];
          newBoard[i] = "X";
          const score = minimax(newBoard, depth + 1, true);
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const aiMove = () => {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = "O";
        const score = minimax(newBoard, 0, false);

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    const newBoard = [...board];
    newBoard[bestMove] = "O";
    setBoard(newBoard);
    setIsXTurn(true);
  };

  const handleClick = (index) => {
    if (checkWinner(board) || board[index] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  useEffect(() => {
    if (!isXTurn && isSinglePlayer) {
      aiMove();
    }
  });
  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      if (winner === "X") {
        setScores((prevState) => ({ ...prevState, x: prevState.x + 1 }));
      } else if (winner === "O") {
        setScores((prevState) => ({ ...prevState, o: prevState.o + 1 }));
      } else {
        setScores((prevState) => ({ ...prevState, tie: prevState.tie + 1 }));
      }
    }
  }, [board]);
  return (
    <>
      <button onClick={() => setIsSinglePlayer(true)}>Vs AI</button>
      <button onClick={() => setIsSinglePlayer(false)}>2 Player</button>
      <div className="button-container">
        <button onClick={handleResetScores}>Reset Scores</button>
        <button onClick={handleReset}>New Game</button>
      </div>
      <div className="board-container">
        {checkWinner(board) && checkWinner(board) !== "tie" ? (
          <h4>{checkWinner(board)} has won</h4>
        ) : checkWinner(board) && checkWinner(board) === "tie" ? (
          <h4>Game Drawn</h4>
        ) : (
          <h4>Player {isXTurn ? "X" : "O"} move</h4>
        )}
        <div className="board-row">
          <Square onClick={() => handleClick(0)} value={board[0]} />
          <Square onClick={() => handleClick(1)} value={board[1]} />
          <Square onClick={() => handleClick(2)} value={board[2]} />
        </div>
        <div className="board-row">
          <Square onClick={() => handleClick(3)} value={board[3]} />
          <Square onClick={() => handleClick(4)} value={board[4]} />
          <Square onClick={() => handleClick(5)} value={board[5]} />
        </div>
        <div className="board-row">
          <Square onClick={() => handleClick(6)} value={board[6]} />
          <Square onClick={() => handleClick(7)} value={board[7]} />
          <Square onClick={() => handleClick(8)} value={board[8]} />
        </div>
        <div className="results">
          <Results score={scores} />
        </div>
      </div>
    </>
  );
};

export default Board;
